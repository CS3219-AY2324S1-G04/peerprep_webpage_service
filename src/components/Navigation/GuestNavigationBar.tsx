import { Button } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useNavigate } from 'react-router-dom'

import Paths, { guestNavigationList } from '../../utils/constants/navigation'
import ColorSchemeToggle from '../ColorSchemeToggle'
import Logo from '../Logo'
import NavigationBar from './NavigationBar'
import NavigationList from './NavigationList'

const GuestNavigationBar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <NavigationBar>
      <NavigationBar.Left>
        <NavigationList list={guestNavigationList} />
      </NavigationBar.Left>
      <NavigationBar.Middle>
        <Logo />
      </NavigationBar.Middle>
      <NavigationBar.Right>
        <ColorSchemeToggle />
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
      </NavigationBar.Right>
    </NavigationBar>
  )
}

const styles = {
  button: {
    width: '40%',
  } as SxProps,
} as const

export default GuestNavigationBar
