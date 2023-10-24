import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Paths from '../utils/constants/navigation'

const GuestRedirect: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(Paths.Login)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <></>
}

export default GuestRedirect
