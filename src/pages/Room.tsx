import { useMatch } from 'react-router-dom'

import Editor from '../features/editor/Editor'
import Paths from '../utils/constants/navigation'

const Room: React.FC = () => {
  const match = useMatch(Paths.Room)
  const id = match?.params.sessionId || ''

  return <Editor id={id} />
}

export default Room
