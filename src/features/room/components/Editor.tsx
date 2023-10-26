import { javascript } from '@codemirror/lang-javascript'
import { vim } from '@replit/codemirror-vim'
import React from 'react'
// @ts-ignore Waiting for dev to fix their package.json.
import { yCollab } from 'y-codemirror.next'
// @ts-ignore Waiting for dev to fix their package.json.
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { editorServiceBaseUrl } from '../../../utils/config'
import { getUsername } from '../../user/selector'
import CodeArea from './CodeArea'

function Editor({ id }: { id: string }) {
  const doc = new Y.Doc()
  const host = editorServiceBaseUrl
  const wsProvider = new WebsocketProvider(host, id, doc)

  const [hasConnect, setHasConnect] = React.useState(false)
  const username = useAppSelector(getUsername)

  const userProperties = {
    name: username,
    color: getRandomColor(),
  }

  wsProvider.awareness.setLocalStateField('user', userProperties)

  const text = doc.getText()
  const yUndoManager = new Y.UndoManager(text)

  const editorExtensions = [
    javascript(),
    vim(),
    yCollab(text, wsProvider.awareness, { yUndoManager }),
  ]

  wsProvider.on('status', (event) => {
    if (event.status == 'connected' && !hasConnect) {
      setHasConnect(true)
    }
  })

  if (hasConnect) {
    return (
      <div>
        <CodeArea editorExtensions={editorExtensions} text={text} />
      </div>
    )
  } else {
    return <div> Connecting... </div>
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
