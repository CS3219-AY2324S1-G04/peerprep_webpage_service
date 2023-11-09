import { Logout, Settings } from '@mui/icons-material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Button,
  Divider,
  Dropdown,
  Input,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Theme,
  Typography,
} from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import React, { useState } from 'react'

import AccountSettingsModal from '../../features/accountSettingsEditor/components/AccountSettingsModal'
import { getEmailAddress, getUsername } from '../../features/user/selector'
import { UserSagaActions } from '../../features/user/types'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { adminNavigationList } from '../../utils/constants/navigation'
import Avatar from '../Avatar'
import ColorSchemeToggle from '../ColorSchemeToggle'
import Logo from '../Logo'
import NavigationBar from './NavigationBar'
import NavigationList from './NavigationList'
import { AvatarShape } from '../../utils/types'

const AdminNavigationBar: React.FC = () => {
  const dispatch = useAppDispatch()

  const username = useAppSelector(getUsername)
  const emailAddress = useAppSelector(getEmailAddress)

  const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] =
    useState(false)

  function openEditAccountSettings() {
    setIsAccountSettingsModalOpen(true)
  }

  function logout() {
    dispatch({ type: UserSagaActions.LOGOUT })
  }

  return (
    <>
      <NavigationBar>
        <NavigationBar.Left>
          <NavigationList list={adminNavigationList} />
        </NavigationBar.Left>
        <NavigationBar.Middle>
          <Logo />
        </NavigationBar.Middle>
        <NavigationBar.Right wrapperClass={styles.rightColumnOverride}>
          <Input
            size="md"
            variant="outlined"
            placeholder="Search"
            startDecorator={<SearchRoundedIcon color="primary" />}
            sx={styles.input}
          />
          <Button size="md" sx={styles.button}>
            QuickPrep 🚀
          </Button>
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
                Logout
              </MenuItem>
            </Menu>
          </Dropdown>
        </NavigationBar.Right>
      </NavigationBar>

      <AccountSettingsModal
        isOpen={isAccountSettingsModalOpen}
        setIsOpen={setIsAccountSettingsModalOpen}
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
  input: {
    flexBasis: '500px',
    display: {
      xs: 'none',
      md: 'flex',
    },
    boxShadow: 'sm',
  } as SxProps,
  button: {
    textWrap: 'nowrap',
  } as SxProps,
}

export default AdminNavigationBar
