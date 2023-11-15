import { Box, Sheet, Stack, Typography } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import moment from 'moment'

import { Message, MessageType } from '../types'

interface ChatBubbleProps {
  message: Message
  prevMessage: Message | null
}

const ChatBubble: React.FC<ChatBubbleProps> = (props: ChatBubbleProps) => {
  const { message, prevMessage } = props

  return (
    <Stack
      direction="row"
      flexDirection={message.type === MessageType.Sent ? 'row-reverse' : 'row'}
    >
      <Box sx={styles.root}>
        {prevMessage?.type !== message.type && (
          <Typography fontWeight="bold" level="body-xs">
            {message.type === MessageType.Sent ? 'You' : message.username}
          </Typography>
        )}
        <Sheet
          color={message.type === MessageType.Sent ? 'primary' : 'neutral'}
          variant={message.type === MessageType.Sent ? 'solid' : 'soft'}
          sx={{
            ...styles.messageContainer,
            borderTopRightRadius: message.type === MessageType.Sent ? 0 : 'lg',
            borderTopLeftRadius:
              message.type === MessageType.Sent ||
              prevMessage?.type === message.type
                ? 'lg'
                : 0,
            backgroundColor:
              message.type === MessageType.Sent
                ? 'var(--joy-palette-primary-softActiveBg)'
                : 'var(--joy-palette-neutral-softHoverBg)',
          }}
        >
          <Typography sx={styles.messageContent}>
            {message.content}&nbsp;
          </Typography>
          <Typography textAlign="right" level="body-xs">
            {moment(message.timestamp).format('h:mma')}
          </Typography>
        </Sheet>
      </Box>
    </Stack>
  )
}

const styles = {
  root: {
    maxWidth: '65%',
    minWidth: 'auto',
  },
  messageContent: {
    fontSize: '0.875rem',
    fontWeight: 400,
  } as SxProps,
  messageContainer: {
    p: 0.8,
    borderRadius: 'md',
    marginBottom: 0.5,
  } as SxProps,
} as const

export default ChatBubble
