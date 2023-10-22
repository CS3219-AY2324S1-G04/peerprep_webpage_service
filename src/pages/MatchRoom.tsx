import { Navigate } from 'react-router-dom'

import Paths from '../utils/constants/navigation'

const MatchRoom: React.FC = () => {
  return <Navigate to={Paths.MatchRoom + `/match`} />
}

export default MatchRoom
