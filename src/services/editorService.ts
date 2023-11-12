// @ts-ignore Waiting for dev to fix their package.json.
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { editorServiceBaseUrl } from '../utils/config'

const ROOM_NAME = 'room'

export enum MessageType {
  sync = 'sync',
  status = 'status',
  connectionClose = 'connection-close',
}

interface AwarenessConfig {
  name: string
  color: string
}

export function getWsProvider(
  roomId: string,
  doc: Y.Doc,
  config: AwarenessConfig,
  messageHandlers: { [id: string]: (event: unknown) => void } = {},
) {
  const wsOpts = {
    connect: false,
    params: { roomId },
  }

  const wsProvider = new WebsocketProvider(
    editorServiceBaseUrl,
    ROOM_NAME,
    doc,
    wsOpts,
  )

  for (const messageType in messageHandlers) {
    wsProvider.on(messageType, messageHandlers[messageType])
  }

  wsProvider.awareness.setLocalStateField('user', config)
  wsProvider.connect()

  return wsProvider
}
