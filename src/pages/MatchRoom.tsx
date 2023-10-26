import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getMatchedRoom } from '../services/roomService'
import Paths from '../utils/constants/navigation'

const MatchRoom: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const navigateToRoom = async () => {
      try {
        const room = await getMatchedRoom()
        navigate(`${Paths.MatchRoom}/${room.roomId}`)
      } catch (error) {
        navigate(Paths.Room)
      }
    }

    navigateToRoom()
  })

  return <></>
}

export default MatchRoom
