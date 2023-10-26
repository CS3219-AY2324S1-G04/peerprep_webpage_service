import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { getIsLoggedIn, getUserId } from '../features/user/selector'
import { useAppSelector } from '../hooks/useAppSelector'
import { getMatchedRoom } from '../services/roomService'
import Paths from '../utils/constants/navigation'

const MatchRoom: React.FC = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const userId = useAppSelector(getUserId)

  const [roomId, setRoomId] = useState('')

  if (isLoggedIn) {
    console.log('find room for ', userId)
    getMatchedRoom()
      .then((room) => {
        console.log(room)
        setRoomId(room.roomId)
      })
      .catch((error) => {
        console.log('Unable to get matched room!', error)
        setRoomId('invalid')
      })
  }

  if (isLoggedIn && roomId != 'invalid' && roomId != '') {
    return <Navigate to={Paths.MatchRoom + `/${roomId}`} />
  } else if (roomId == 'invalid') {
    return <Navigate to={Paths.Root} />
  }
}

export default MatchRoom
