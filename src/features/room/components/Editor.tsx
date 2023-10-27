import { javascript } from '@codemirror/lang-javascript'
import { Skeleton } from '@mui/joy'
import { vim } from '@replit/codemirror-vim'
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
  const [hasSync, setHasSync] = React.useState(false)
  const [doc] = React.useState<Y.Doc>(new Y.Doc())
  const [wsProvider] = React.useState(
    new WebsocketProvider(editorServiceBaseUrl, id, doc),
  )
  const username = useAppSelector(getUsername)

  useEffect(() => {
    console.log('use effect')

    const userProperties = {
      name: username,
      color: getRandomColor(),
    }

    wsProvider.connect()
    wsProvider.awareness.setLocalStateField('user', userProperties)

    wsProvider.on('sync', (event) => {
      console.log('sync')
      setHasSync(true)
    })

    wsProvider.on('status', (event) => {
      console.log('connect')

      if (event.status == 'connected') {
        setHasConnect(true)
        if (doc.getText().toString() != '') {
          // TODO: Remove temp workaround
          setHasSync(true)
        }
      }
    })

    wsProvider.on('connection-close', (event) => {
      navigate(Paths.Root)
    })

    return () => {
      console.log("destroy")
      wsProvider.destroy()
    }
  }, [doc, id, navigate, username, wsProvider])

  if (hasConnect && hasSync) {
    const yUndoManager = new Y.UndoManager(doc.getText())

    const editorExtensions = [
      javascript(),
      vim(),
      yCollab(doc.getText(), wsProvider.awareness, { yUndoManager }),
    ]

    return <CodeArea editorExtensions={editorExtensions} text={doc.getText()} />
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
