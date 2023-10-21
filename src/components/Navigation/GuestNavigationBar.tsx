import { Button } from '@mui/joy'
import { useNavigate } from 'react-router-dom'

import Paths, { guestNavigationList } from '../../utils/constants/navigation'
import NavigationBar from './NavigationBar'

const GuestNavigationBar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <NavigationBar navigationList={guestNavigationList}>
      <Button
        variant="plain"
        sx={styles.button}
        onClick={() => navigate(Paths.Login)}
      >
        Log in
      </Button>
      <Button
        size="md"
        sx={styles.button}
        onClick={() => navigate(Paths.SignUp)}
      >
        Sign up
      </Button>
    </NavigationBar>
  )
}

const styles = {
  button: {
    width: '40%',
  },
} as const

export default GuestNavigationBar
