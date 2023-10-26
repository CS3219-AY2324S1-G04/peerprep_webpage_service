import { javascript } from '@codemirror/lang-javascript'
import { Skeleton, Typography } from '@mui/joy'
import { vim } from '@replit/codemirror-vim'
import { Extension } from '@uiw/react-codemirror'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// @ts-ignore Waiting for dev to fix their package.json.
import { yCollab } from 'y-codemirror.next'
// @ts-ignore Waiting for dev to fix their package.json.
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { editorServiceBaseUrl } from '../../../utils/config'
import Paths from '../../../utils/constants/navigation'
import { getUsername } from '../../user/selector'
import CodeArea from './CodeArea'

function Editor({ id }: { id: string }) {
  const navigate = useNavigate()

  const [hasConnect, setHasConnect] = React.useState(false)
  const [text, setText] = React.useState<Y.Text | null>(null)
  const [editorExtensions, setEditorExtensions] = React.useState<
    Extension[] | null
  >(null)

  const username = useAppSelector(getUsername)

  useEffect(() => {
    const doc = new Y.Doc()
    const host = editorServiceBaseUrl
    const wsProvider = new WebsocketProvider(host, id, doc)

    const userProperties = {
      name: username,
      color: getRandomColor(),
    }

    wsProvider.awareness.setLocalStateField('user', userProperties)

    wsProvider.on('status', (event) => {
      if (event.status == 'connected' && !hasConnect) {
        setText(doc.getText())
        setHasConnect(true)
      }
    })

    wsProvider.on('connection-close', (event) => {
      navigate(Paths.Root)
    })

    const text = doc.getText()
    const yUndoManager = new Y.UndoManager(text)

    setEditorExtensions([
      javascript(),
      vim(),
      yCollab(text, wsProvider.awareness, { yUndoManager }),
    ])

    return () => {
      wsProvider.destroy()
    }
  }, [hasConnect, id, username, navigate])

  if (hasConnect && text && editorExtensions) {
    return <CodeArea editorExtensions={editorExtensions} text={text} />
  } else {
    return <Skeleton> </Skeleton>
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default Editor
