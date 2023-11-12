import { Grid, LinearProgress, Box, Input, Button } from '@mui/joy'
import { useEffect, useState } from 'react'

import Editor from '../features/room/components/Editor'
import RoomQuestion from '../features/room/components/RoomQuestion'
import { getRoomData, getRoomStatus } from '../features/room/selectors'
import { closeRoom } from '../features/room/slice'
import { RoomSagaActions, RoomStatus } from '../features/room/types'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { ChatSagaActions, Message } from '../features/chat/types'
import { getUserId, getUsername } from '../features/user/selector'
import Chat from '../features/chat/components/Chat'

const Room: React.FC = () => {
  // TODO: If room id params provided, load room of roomId.

  const roomStatus = useAppSelector(getRoomStatus)
  const roomData = useAppSelector(getRoomData)
  const userId = useAppSelector(getUserId)
  const username = useAppSelector(getUsername)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (roomStatus == RoomStatus.Pending) {
      dispatch({ type: RoomSagaActions.LOAD_MATCH_ROOM_DATA })
      return () => {
        dispatch({ type: RoomSagaActions.STOP_LOAD_ROOM })
      }
    } else if (roomStatus == RoomStatus.Open) {
      return () => {
        dispatch(closeRoom())
        dispatch({ type: ChatSagaActions.STOP_ROOM_CHAT_WS })
      }
    }
  }, [dispatch, roomStatus])

  useEffect(() => {
    if (roomData && roomData.roomId !== '') {
      dispatch({
        type: ChatSagaActions.START_ROOM_CHAT_WS, payload: {
          roomId: roomData.roomId,
          userId: userId,
          username: username
        }
      })
    }
  }, [roomData])

  const sendMessage = (value: string) => {
    dispatch({
      type: ChatSagaActions.SEND_MESSAGE, payload: {
        username: username ?? '',
        content: value,
        timestamp: (new Date()).toISOString(),
      }
    })
  }

  if (roomStatus == RoomStatus.Pending) {
    return <LinearProgress></LinearProgress>
  } else if (roomStatus == RoomStatus.Open && roomData) {
    return (
      <>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid xs={12} md={4}>
            <RoomQuestion />
          </Grid>
          <Grid xs={12} md={8}>
            <Editor roomId={roomData.roomId} />
          </Grid>
        </Grid>
        <Chat onSendMessage={sendMessage} introLabel="Chat with your peer here! 😬" />
      </>
    )
  }
}

export default Room
