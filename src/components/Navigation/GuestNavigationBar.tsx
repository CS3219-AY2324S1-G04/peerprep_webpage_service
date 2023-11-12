import MenuIcon from '@mui/icons-material/Menu'
import { Button, IconButton, useTheme } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Paths, { guestNavigationList } from '../../utils/constants/navigation'
import ColorSchemeToggle from '../ColorSchemeToggle'
import Logo from '../Logo'
import MobileNavigationDrawer from './MobileNavigationDrawer'
import NavigationBar from './NavigationBar'
import NavigationList from './NavigationList'

const GuestNavigationBar: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  function toggleDrawer(inOpen: boolean) {
    setIsDrawerOpen(inOpen)
  }

  return (
    <>
      <NavigationBar>
        <NavigationBar.Left
          wrapperClass={
            isTabletOrMobile ? styles.leftColumnOverride : undefined
          }
        >
          {isTabletOrMobile && (
            <>
              <IconButton onClick={() => toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Logo variant="row" />
            </>
          )}
          {!isTabletOrMobile && <NavigationList list={guestNavigationList} />}
        </NavigationBar.Left>
        <NavigationBar.Middle>
          {!isTabletOrMobile && <Logo />}
        </NavigationBar.Middle>
        <NavigationBar.Right wrapperClass={styles.rightColumnOverride}>
          <ColorSchemeToggle />
          <Button variant="plain" onClick={() => navigate(Paths.Login)}>
            Log in
          </Button>
          <Button size="md" onClick={() => navigate(Paths.SignUp)}>
            Sign up
          </Button>
        </NavigationBar.Right>
      </NavigationBar>

      <MobileNavigationDrawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        list={guestNavigationList}
      />
    </>
  )
}

const styles = {
  rightColumnOverride: {
    justifyContent: 'flex-end',
  } as SxProps,
  leftColumnOverride: {
    display: 'flex',
  } as SxProps,
} as const

export default GuestNavigationBar
