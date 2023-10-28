import { javascript } from '@codemirror/lang-javascript'
import { vim } from '@replit/codemirror-vim'
import Color from 'color'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// @ts-ignore Waiting for dev to fix their package.json.
import { yCollab } from 'y-codemirror.next'
// @ts-ignore Waiting for dev to fix their package.json.
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { MessageType, initWsProvider } from '../../../services/editorService'
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
  const username = useAppSelector(getUsername) ?? ''

  useEffect(() => {
    console.log('\n Setup web socket', roomId)

    const messageHandlers: { [id: string]: (event) => void } = {}

    messageHandlers[MessageType.sync] = (event) => {
      console.log('sync')
      setHasConnect(true)
    }

    messageHandlers[MessageType.status] = (event) => {
      console.log('status: ', event.status)

      if (event.status == 'connected') {
        console.log('connected', doc.getText().toString())
        setHasConnect(true)
      }
    }

    messageHandlers[MessageType.connectionClose] = (event) => {
      navigate(Paths.Root)
    }

    const awarenessConfig = {
      name: username,
      color: getColorFromUsername(username).hex(),
    }

    const newWsProvider = initWsProvider(
      roomId,
      doc,
      awarenessConfig,
      messageHandlers,
    )

    setWsProvider(newWsProvider)

    return () => {
      newWsProvider.destroy()
      console.log('Destroy websocket', roomId, newWsProvider.shouldConnect)
    }
  }, [doc, navigate, roomId, username])

  if (hasConnect) {
    const yUndoManager = new Y.UndoManager(doc.getText())

    const editorExtensions = [
      javascript(),
      vim(),
      yCollab(doc.getText(), wsProvider.awareness, { yUndoManager }),
    ]

    return <CodeArea editorExtensions={editorExtensions} text={doc.getText()} />
  }
}

// TODO: Extract this functionality to some common module.
function getColorFromUsername(username: string) {
  const hueRange: [number, number] = [0, 360]
  const saturationRange: [number, number] = [60, 71]
  const lightnessRange: [number, number] = [50, 61]

  function getBackgroundColor(
    text: string,
    hueRange: [number, number],
    saturationRange: [number, number],
    lightnessRange: [number, number],
  ) {
    const hash: number = hashString(text)

    const hue: number = hashToRange(hash, hueRange)
    const saturation: number = hashToRange(hash, saturationRange)
    const lightness: number = hashToRange(hash, lightnessRange)

    return Color.hsl(hue, saturation, lightness)
  }

  function hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; ++i) {
      hash = (hash << 5) - hash + str.charCodeAt(i)
    }

    return hash < 0 ? hash * -1 : hash
  }

  function hashToRange(hash: number, valRange: [number, number]) {
    return (hash % (valRange[1] - valRange[0])) + valRange[0]
  }

  return getBackgroundColor(username, hueRange, saturationRange, lightnessRange)
}

export default Editor
