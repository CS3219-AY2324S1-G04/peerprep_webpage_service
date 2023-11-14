import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Button, IconButton, useTheme } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ChatButton from '../../features/chat/components/ChatButton'
import { ChatSagaActions } from '../../features/chat/types'
import ConfirmLeaveModal from '../../features/room/components/ConfirmLeaveModal'
import RoomAdditionalInfoModal from '../../features/room/components/RoomAdditionalInfoModal'
import { getUsername } from '../../features/user/selector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import Paths from '../../utils/constants/navigation'
import ColorSchemeToggle from '../ColorSchemeToggle'
import Logo from '../Logo'
import NavigationBar from './NavigationBar'

const RoomNavigationBar: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'))
  const username = useAppSelector(getUsername)

  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] =
    useState<boolean>(false)
  const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState<boolean>(false)

  const onBack = () => {
    navigate(Paths.Problems)
  }

  const sendMessage = (value: string) => {
    dispatch({
      type: ChatSagaActions.SEND_MESSAGE,
      payload: {
        username: username ?? '',
        content: value,
        timestamp: new Date().toISOString(),
      },
    })
  }

  return (
    <>
      <NavigationBar>
        <NavigationBar.Left wrapperClass={styles.leftColumnOverride}>
          <Box sx={styles.backLogo} onClick={() => onBack()}>
            <ArrowBackIosIcon />
            <Logo variant={isTabletOrMobile ? 'logo' : 'row'} />
          </Box>
        </NavigationBar.Left>
        <NavigationBar.Right wrapperClass={styles.rightColumnOverride}>
          <IconButton
            size="sm"
            variant="soft"
            onClick={() => {
              setIsAdditionalInfoOpen(true)
            }}
          >
            <ErrorOutlineIcon />
          </IconButton>
          <ColorSchemeToggle />
          {!isTabletOrMobile && (
            <ChatButton
              onSendMessage={sendMessage}
              introLabel="Chat with your peer here! 😬"
            />
          )}
          <Button color="danger" onClick={() => setIsConfirmLeaveOpen(true)}>
            Leave & Submit
          </Button>
        </NavigationBar.Right>
      </NavigationBar>
      <RoomAdditionalInfoModal
        isOpen={isAdditionalInfoOpen}
        onClose={() => {
          setIsAdditionalInfoOpen(false)
        }}
      />
      <ConfirmLeaveModal
        isOpen={isConfirmLeaveOpen}
        onClose={() => {
          setIsConfirmLeaveOpen(false)
        }}
      />
    </>
  )
}

const styles = {
  rightColumnOverride: {
    justifyContent: 'flex-end',
  } as SxProps,
  leftColumnOverride: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  } as SxProps,
  backLogo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
} as const

export default RoomNavigationBar
