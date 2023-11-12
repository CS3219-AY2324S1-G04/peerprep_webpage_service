import { Popper } from '@mui/base'
import ChatIcon from '@mui/icons-material/Chat'
import { Badge, Box, IconButton, Theme } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getMessages } from '../selectors'
import ChatPane from './ChatPane'
import { MessageType } from '../types'

interface ChatProps {
  onSendMessage: (value: string) => void
  introLabel?: string
}

const Chat: React.FC<ChatProps> = (props: ChatProps) => {
  const { onSendMessage, introLabel } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const messages = useAppSelector(getMessages)
  const [unreadMessages, setUnreadMessages] = useState<boolean>(false)
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!open && messages.length > 0) {
      const top = messages[messages.length - 1]
      if (top.type !== MessageType.Sent) {
        setUnreadMessages(true)
      }
    }
  }, [messages])

  useEffect(() => {
    if(unreadMessages && open) {
      setUnreadMessages(false)
    }
  }, [open])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  return (
    <>
      <IconButton sx={styles.chatButton} size='lg' variant='solid' color='primary' onClick={handleClick}>
        {unreadMessages ? (
          <Badge size="sm" color="danger">
            <ChatIcon />
          </Badge>
        ) : (<ChatIcon />)}
      </IconButton>
      <Popper open={open} anchorEl={anchorEl} placement='top-end'>
        <ChatPane title="Room Chat" onClose={() => setAnchorEl(null)}>
          <ChatPane.Messages messages={messages} introLabel={introLabel} />
          <ChatPane.Input onSendMessage={onSendMessage} />
        </ChatPane>
      </Popper>
    </>
  )
}

const styles = {
  sheet: ((theme: Theme) => {
    return {
      borderRadius: '10px',
      width: '350px',
      marginBottom: '1rem',
    }
  }) as SxProps,
  messagesStack: {
    overflow: 'auto',
    height: '350px',
    maxHeight: '450px',
  } as SxProps,
  chatButton: ((theme: Theme) => {
    return {
      position: 'fixed',
      right: '20px',
      bottom: '20px',
      height: '50px',
      width: '50px',
      borderRadius: '100%',
    }
  }) as SxProps,
  messageContent: {
    fontSize: '0.875rem',
    fontWeight: 400
  } as SxProps
} as const

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (elementRef && elementRef.current) {
      elementRef.current.scrollIntoView()
    }
  }, [elementRef])
  return <Box ref={elementRef} />
};

export default Chat
