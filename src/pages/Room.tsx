import { Grid } from '@mui/joy'
import { useParams } from 'react-router-dom'

import Editor from '../features/room/components/Editor'

const Room: React.FC = () => {
  const params = useParams()
  const roomId = params.roomId || 'default'

  return (
    <Grid>
      <Editor id={roomId} />
    </Grid>
  )
}

export default Room
