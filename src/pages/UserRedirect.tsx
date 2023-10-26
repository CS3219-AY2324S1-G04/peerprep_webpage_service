import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Paths from '../utils/constants/navigation'

const UserRedirect: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log("redirect")
    navigate(Paths.Dashboard)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <></>
}

export default UserRedirect
