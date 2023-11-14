import { History, Logout, Settings } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Button,
  Divider,
  Dropdown,
  IconButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Theme,
  Typography,
  useTheme,
} from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AccountSettingsModal from '../../features/accountSettingsEditor/components/AccountSettingsModal'
import { getRoomStatus } from '../../features/room/selectors'
import { RoomStatus } from '../../features/room/types'
import { getEmailAddress, getUsername } from '../../features/user/selector'
import { UserSagaActions } from '../../features/user/types'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import Paths, { userNavigationList } from '../../utils/constants/navigation'
import { AvatarShape } from '../../utils/types'
import Avatar from '../Avatar'
import ColorSchemeToggle from '../ColorSchemeToggle'
import Logo from '../Logo'
import QuickPrepButton from '../QuickPrepButton'
import MobileNavigationDrawer from './MobileNavigationDrawer'
import NavigationBar from './NavigationBar'
import NavigationList from './NavigationList'

const UserNavigationBar: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'))

  const username = useAppSelector(getUsername)
  const emailAddress = useAppSelector(getEmailAddress)
  const roomStatus = useAppSelector(getRoomStatus)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] =
    useState(false)

  function openEditAccountSettings() {
    setIsAccountSettingsModalOpen(true)
  }

  function logout() {
    dispatch({ type: UserSagaActions.LOGOUT })
  }

  function toggleDrawer(inOpen: boolean) {
    setIsDrawerOpen(inOpen)
  }

  function goToAttempts() {
    navigate(Paths.Attempts)
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
          {!isTabletOrMobile && <NavigationList list={userNavigationList} />}
        </NavigationBar.Left>
        <NavigationBar.Middle>
          {!isTabletOrMobile && <Logo />}
        </NavigationBar.Middle>
        <NavigationBar.Right wrapperClass={styles.rightColumnOverride}>
          {roomStatus === RoomStatus.Open && (
            <Button
              color="warning"
              onClick={() => {
                navigate(Paths.MatchRoom)
              }}
            >
              Back to room
            </Button>
          )}
          <QuickPrepButton disabled={roomStatus === RoomStatus.Open} />
          <ColorSchemeToggle />
          <Dropdown>
            <MenuButton variant="plain" sx={{ padding: 0 }}>
              <Avatar alt={username} shape={AvatarShape.squircleSm} />
            </MenuButton>
            <Menu
              sx={(theme: Theme) => {
                return { zIndex: theme.zIndex.tooltip }
              }}
            >
              <MenuItem sx={styles.userProfileContainer}>
                <Typography noWrap={true} sx={styles.username}>
                  {username}
                </Typography>
                <Typography noWrap={true} sx={styles.emailAddress}>
                  {emailAddress}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={openEditAccountSettings}>
                <ListItemDecorator>
                  <Settings />
                </ListItemDecorator>
                Edit Account Settings
              </MenuItem>
              <MenuItem onClick={goToAttempts}>
                <ListItemDecorator>
                  <History />
                </ListItemDecorator>
                My Attempts
              </MenuItem>
              <MenuItem onClick={logout}>
                <ListItemDecorator>
                  <Logout />
                </ListItemDecorator>
                Log Out
              </MenuItem>
            </Menu>
          </Dropdown>
        </NavigationBar.Right>
      </NavigationBar>

      <AccountSettingsModal
        isOpen={isAccountSettingsModalOpen}
        setIsOpen={setIsAccountSettingsModalOpen}
      />

      <MobileNavigationDrawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        list={userNavigationList}
      />
    </>
  )
}

const styles = {
  avatarMenuButton: {
    padding: 0,
  } as SxProps,
  userProfileContainer: {
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
  } as SxProps,
  username: { width: 0, minWidth: '100%', fontSize: '1rem' },
  emailAddress: { width: 0, minWidth: '100%', fontSize: '0.8rem' },
  rightColumnOverride: {
    justifyContent: 'flex-end',
  } as SxProps,
  leftColumnOverride: {
    display: 'flex',
  } as SxProps,
  button: {
    textWrap: 'nowrap',
  } as SxProps,
}

export default UserNavigationBar
