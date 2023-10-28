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

function Editor({ roomId }: { roomId: string }) {
  const navigate = useNavigate()

  const [hasConnect, setHasConnect] = React.useState(false)
  const [doc] = React.useState<Y.Doc>(new Y.Doc())
  const [wsProvider, setWsProvider] = React.useState<WebsocketProvider | null>(
    null,
  )
  const username = useAppSelector(getUsername)

  useEffect(() => {
    // console.log('\n Setup web socket', roomId)

    const wsOpts = {
      connect: false,
    }

    const newWsProvider = new WebsocketProvider(
      editorServiceBaseUrl,
      roomId,
      doc,
      wsOpts,
    )

    setWsProvider(newWsProvider)
    return () => {
      newWsProvider.destroy()
      // console.log('Destroy websocket', roomId, newWsProvider.shouldConnect)
      setWsProvider(null)
    }
  }, [doc, roomId])

  useEffect(() => {
    if (!wsProvider || hasConnect) {
      return
    }

    // console.log('\n Register web socket', roomId, wsProvider)

    const userProperties = {
      name: username,
      color: getRandomColor(),
    }

    wsProvider.awareness.setLocalStateField('user', userProperties)

    wsProvider.on('sync', (event) => {
      if (!wsProvider.shouldConnect) {
        return
      }

      // console.log('sync')
      setHasConnect(true)
    })

    wsProvider.on('status', (event) => {
      if (!wsProvider.shouldConnect) {
        return
      }

      // console.log('status: ', event.status)
      if (event.status == 'connected') {
        // console.log('connected', doc.getText().toString(), wsProvider.synced)
        setHasConnect(true)
      }
    })

    wsProvider.on('connection-close', (event) => {
      navigate(Paths.Root)
    })

    wsProvider.connect()
    // console.log('\n Connect web socket', roomId)
  }, [doc, hasConnect, navigate, username, wsProvider, roomId])

  if (hasConnect) {
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
