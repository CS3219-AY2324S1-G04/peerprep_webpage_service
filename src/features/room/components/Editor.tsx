import { javascript } from '@codemirror/lang-javascript'
import { Box, Card, LinearProgress, Switch, Typography } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { vim } from '@replit/codemirror-vim'
import Color from 'color'
import React, { useEffect } from 'react'
// @ts-ignore Waiting for dev to fix their package.json.
import { yCollab } from 'y-codemirror.next'
// @ts-ignore Waiting for dev to fix their package.json.
import * as Y from 'yjs'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { MessageType, getWsProvider } from '../../../services/editorService'
import { getUsername } from '../../user/selector'
import CodeArea from './CodeArea'

function Editor({
  roomId,
  onConnectionClose,
}: {
  roomId: string
  onConnectionClose?: () => void
}) {
  const [hasConnect, setHasConnect] = React.useState(false)
  const [doc, setDoc] = React.useState<Y.Doc>(new Y.Doc())
  const [awareness, setAwareness] = React.useState(null)
  const username = useAppSelector(getUsername) ?? ''
  const [isVimMode, setIsVimMode] = React.useState(false)

  useEffect(() => {
    const messageHandlers: { [id: string]: () => void } = {}

    messageHandlers[MessageType.sync] = () => {
      setHasConnect(true)
    }

    messageHandlers[MessageType.connectionClose] = () => {
      if (onConnectionClose) {
        onConnectionClose()
      }
      setHasConnect(false)
    }

    const awarenessConfig = {
      name: username,
      color: getColorFromUsername(username).hex(),
    }

    const wsProvider = getWsProvider(
      roomId,
      doc,
      awarenessConfig,
      messageHandlers,
    )

    setAwareness(wsProvider.awareness)

    return () => {
      wsProvider.destroy()
      setDoc(new Y.Doc())
    }
  }, [doc, onConnectionClose, roomId, username])

  if (!hasConnect) {
    return (
      <Card>
        <LinearProgress></LinearProgress>
      </Card>
    )
  }

  const yUndoManager = new Y.UndoManager(doc.getText())

  const editorExtensions = [
    javascript(), // TODO: Use match language.
    yCollab(doc.getText(), awareness, { yUndoManager }),
  ]

  // TODO: set cookie for vim mode.
  if (isVimMode) {
    editorExtensions.push(vim())
  }

  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={styles.editorControlBar}>
        <Typography
          component="label"
          endDecorator={
            <Switch
              variant="soft"
              checked={isVimMode}
              onChange={(event) => setIsVimMode(event.target.checked)}
            />
          }
        >
          Vim Mode
        </Typography>
      </Box>
      <CodeArea editorExtensions={editorExtensions} text={doc.getText()} />
    </Card>
  )
}

const styles = {
  editorControlBar: {
    borderRadius: 25,
    display: 'grid',
    height: 35,
  } as SxProps,
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
