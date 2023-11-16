import { Box, Divider, Stack, Typography } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useEffect, useRef } from 'react'

import { Message, MessageType } from '../types'
import ChatBubble from './ChatBubble'

interface ChatMessagesProps {
  messages: Message[]
  introLabel?: string
}

const ChatMessages: React.FC<ChatMessagesProps> = (
  props: ChatMessagesProps,
) => {
  const { messages, introLabel } = props

  return (
    <Stack sx={styles.root} direction="column">
      <Typography p={1.5} pt={0} level="body-xs" textAlign="center" mt={1}>
        ⚠️ Note that leaving or refreshing this page will clear the chat history
      </Typography>
      <Divider />
      {introLabel && (
        <Typography level="body-xs" textAlign="center" mt={1}>
          {introLabel}
        </Typography>
      )}
      <Box sx={styles.messagesBox}>
        {messages.map((message, index, array) => {
          const prevMessage = index > 0 ? array[index - 1] : null
          if (message.type === MessageType.System) {
            return (
              <Typography level="body-xs" textAlign="center">
                {message.content}
              </Typography>
            )
          }
          return <ChatBubble message={message} prevMessage={prevMessage} />
        })}
      </Box>
      <AlwaysScrollToBottom dependencies={messages} />
    </Stack>
  )
}

const styles = {
  root: {
    overflow: 'auto',
    height: '350px',
    maxHeight: '450px',
  } as SxProps,
  messagesBox: {
    p: 1.5,
    paddingTop: 1,
  } as SxProps,
} as const

// Util component that scrolls to the bottom of a component

interface AlwaysScrollToBottomProps {
  dependencies: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

const AlwaysScrollToBottom = (props: AlwaysScrollToBottomProps) => {
  const { dependencies } = props
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (elementRef && elementRef.current) {
      elementRef.current.scrollIntoView()
    }
  }, [elementRef, dependencies])
  return <Box ref={elementRef} />
}

export default ChatMessages
