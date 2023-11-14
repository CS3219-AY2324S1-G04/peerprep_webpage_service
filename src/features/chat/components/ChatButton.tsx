import { Popper } from '@mui/base'
import ChatIcon from '@mui/icons-material/Chat'
import { Badge, Box, Button } from '@mui/joy'
import { useEffect, useState } from 'react'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { getMessages } from '../selectors'
import { MessageType } from '../types'
import ChatPane from './ChatPane'

interface ChatProps {
  onSendMessage: (value: string) => void
  introLabel?: string
}

const ChatButton: React.FC<ChatProps> = (props: ChatProps) => {
  const { onSendMessage, introLabel } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const messages = useAppSelector(getMessages)
  const [unreadMessages, setUnreadMessages] = useState<boolean>(false)
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (!open && messages.length > 0) {
      const top = messages[messages.length - 1]
      if (top.type !== MessageType.Sent) {
        setUnreadMessages(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  useEffect(() => {
    if (unreadMessages && open) {
      setUnreadMessages(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <>
      <Button
        color="primary"
        onClick={handleClick}
        endDecorator={
          <>
            {unreadMessages ? (
              <Box className="bounce">
                <Badge size="sm" color="danger">
                  <ChatIcon />
                </Badge>
              </Box>
            ) : (
              <ChatIcon />
            )}
          </>
        }
      >
        Chat
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        disablePortal
      >
        <ChatPane title="Room Chat" onClose={() => setAnchorEl(null)}>
          <ChatPane.Messages messages={messages} introLabel={introLabel} />
          <ChatPane.Input onSendMessage={onSendMessage} />
        </ChatPane>
      </Popper>
    </>
  )
}

export default ChatButton
