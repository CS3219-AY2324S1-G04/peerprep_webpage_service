import { Grid, LinearProgress } from '@mui/joy'
import { useEffect } from 'react'

import Chat from '../features/chat/components/Chat'
import { ChatSagaActions } from '../features/chat/types'
import Editor from '../features/room/components/Editor'
import RoomQuestion from '../features/room/components/RoomQuestion'
import { getRoomData, getRoomStatus } from '../features/room/selectors'
import { RoomSagaActions, RoomStatus } from '../features/room/types'
import { getUserId, getUsername } from '../features/user/selector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'

const Room: React.FC = () => {
  // TODO: If room id params provided, load room of roomId.

  const roomStatus = useAppSelector(getRoomStatus)
  const roomData = useAppSelector(getRoomData)
  const userId = useAppSelector(getUserId)
  const username = useAppSelector(getUsername)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (roomStatus == RoomStatus.Open) {
      dispatch({ type: RoomSagaActions.START_KEEP_ALIVE })
      dispatch({ type: RoomSagaActions.START_POLL_MATCH_ROOM })

      return () => {
        dispatch({ type: ChatSagaActions.STOP_ROOM_CHAT_WS })
        dispatch({ type: RoomSagaActions.STOP_KEEP_ALIVE })
      }
    } else {
      dispatch({ type: RoomSagaActions.START_FIND_MATCH_ROOM })
      return () => {
        dispatch({ type: RoomSagaActions.STOP_FIND_MATCH_ROOM })
      }
    }
  }, [dispatch, roomStatus])

  useEffect(() => {
    if (roomData && roomData.roomId !== '') {
      dispatch({
        type: ChatSagaActions.START_ROOM_CHAT_WS,
        payload: {
          roomId: roomData.roomId,
          userId: userId,
          username: username,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData])

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
            <Editor roomId={roomData.roomId} langSlug={roomData.langSlug} />
          </Grid>
        </Grid>
        <Chat
          onSendMessage={sendMessage}
          introLabel="Chat with your peer here! 😬"
        />
      </>
    )
  }
}

export default Room
