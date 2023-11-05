import { Grid, LinearProgress } from '@mui/joy'
import { useEffect } from 'react'

import Editor from '../features/room/components/Editor'
import RoomQuestion from '../features/room/components/RoomQuestion'
import { getRoomData, getRoomStatus } from '../features/room/selectors'
import { closeRoom } from '../features/room/slice'
import { RoomSagaActions, RoomStatus } from '../features/room/types'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'

const Room: React.FC = () => {
  // TODO: If room id params provided, load room of roomId.

  const roomStatus = useAppSelector(getRoomStatus)
  const roomData = useAppSelector(getRoomData)
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
      }
    }
  }, [dispatch, roomStatus])

  if (roomStatus == RoomStatus.Pending) {
    return <LinearProgress></LinearProgress>
  } else if (roomStatus == RoomStatus.Open && roomData) {
    return (
      <Grid container spacing={2}>
        <Grid xs={4}>
          <RoomQuestion />
        </Grid>
        <Grid xs={8}>
          <Editor roomId={roomData.roomId} />
        </Grid>
      </Grid>
    )
  }
}

export default Room
