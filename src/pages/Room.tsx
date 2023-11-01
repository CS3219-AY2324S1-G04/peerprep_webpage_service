import { Grid } from '@mui/joy'
import { useNavigate, useParams } from 'react-router-dom'

import Editor from '../features/room/components/Editor'
import RoomQuestion from '../features/room/components/RoomQuestion'
import Paths from '../utils/constants/navigation'

const Room: React.FC = () => {
  const params = useParams()
  const roomId = params.roomId || 'default'
  const navigate = useNavigate()

  const onEditorConnectionClose = () => {
    navigate(Paths.Root)
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={4}>
        <RoomQuestion roomId={roomId} />
      </Grid>
      <Grid xs={8}>
        <Editor roomId={roomId} onConnectionClose={onEditorConnectionClose} />
      </Grid>
    </Grid>
  )
}

export default Room
