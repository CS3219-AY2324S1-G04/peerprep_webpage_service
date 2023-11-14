import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Button, IconButton, useTheme } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ChatButton from '../../features/chat/components/ChatButton'
import { ChatSagaActions } from '../../features/chat/types'
import RoomAdditionalInfoModal from '../../features/room/components/RoomAdditionalInfoModal'
import { getUsername } from '../../features/user/selector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import useAsyncTask from '../../hooks/useAsyncTask'
import roomService from '../../services/roomService'
import Paths from '../../utils/constants/navigation'
import ColorSchemeToggle from '../ColorSchemeToggle'
import Logo from '../Logo'
import { toast } from '../Toaster/toast'
import NavigationBar from './NavigationBar'

const RoomNavigationBar: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const [runLeaveRoom, loadingLeaveRoom] = useAsyncTask(
    'leaveRoom',
    (error) => {
      toast.error(
        error?.message ??
          'Oops! We encountered an error, sorry about that. Please try again later',
      )
    },
  )
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'))
  const username = useAppSelector(getUsername)

  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] =
    useState<boolean>(false)

  const onLeaveRoom = () => {
    runLeaveRoom(async () => {
      await roomService.leaveRoom()
      toast.success('Successfully submitted your attempt! Great work! 🎉')
      navigate(Paths.Problems)
    })
  }

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
          <Button
            color="danger"
            onClick={() => onLeaveRoom()}
            loading={loadingLeaveRoom}
          >
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
