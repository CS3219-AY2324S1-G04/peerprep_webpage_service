import { Logout, Settings } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import {
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

import AccountSettingsModal from '../../features/accountSettingsEditor/components/AccountSettingsModal'
import { getEmailAddress, getUsername } from '../../features/user/selector'
import { UserSagaActions } from '../../features/user/types'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { adminNavigationList } from '../../utils/constants/navigation'
import { AvatarShape } from '../../utils/types'
import Avatar from '../Avatar'
import ColorSchemeToggle from '../ColorSchemeToggle'
import Logo from '../Logo'
import MobileNavigationDrawer from './MobileNavigationDrawer'
import NavigationBar from './NavigationBar'
import NavigationList from './NavigationList'

const AdminNavigationBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'))

  const username = useAppSelector(getUsername)
  const emailAddress = useAppSelector(getEmailAddress)

  const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] =
    useState<boolean>(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  function openEditAccountSettings() {
    setIsAccountSettingsModalOpen(true)
  }

  function logout() {
    dispatch({ type: UserSagaActions.LOGOUT })
  }

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
          {!isTabletOrMobile && <NavigationList list={adminNavigationList} />}
        </NavigationBar.Left>
        <NavigationBar.Middle>
          {!isTabletOrMobile && <Logo />}
        </NavigationBar.Middle>
        <NavigationBar.Right wrapperClass={styles.rightColumnOverride}>
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
        list={adminNavigationList}
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

export default AdminNavigationBar
