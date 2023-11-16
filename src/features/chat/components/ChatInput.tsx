import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Box, Button, IconButton, Textarea, TextareaProps } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { KeyboardEvent, useState } from 'react'

interface ChatInputProps extends TextareaProps {
  onSendMessage: (value: string) => void
}

const ChatInput = (props: ChatInputProps) => {
  const { onSendMessage } = props
  const [value, setValue] = useState<string>('')

  const addEmoji = (emoji: string) => () => setValue(`${value}${emoji}`)

  const send = () => {
    const toSend = value
    if (value.trim() === '') return
    onSendMessage(toSend)
    setValue('')
  }

  const onKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Enter') {
      e.preventDefault()
      send()
    }
  }

  return (
    <Textarea
      minRows={2}
      maxRows={2}
      value={value}
      onKeyDown={(e) => onKeyPress(e)}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      placeholder="Message"
      endDecorator={
        <Box sx={styles.sendBox}>
          <Box sx={styles.emojiBox}>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji('👍')}
            >
              👍
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji('🔥')}
            >
              🔥
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji('😭')}
            >
              😭
            </IconButton>
          </Box>
          <Button
            endDecorator={<SendRoundedIcon />}
            onClick={() => {
              send()
            }}
          >
            Send
          </Button>
        </Box>
      }
    />
  )
}

const styles = {
  sendBox: {
    display: 'flex',
    flex: 1,
    py: 1,
    borderTop: '1px solid',
    borderColor: 'divider',
    justifyContent: 'space-between',
  } as SxProps,
  emojiBox: {
    display: 'flex',
    gap: 0.5,
  },
} as const

export default ChatInput
