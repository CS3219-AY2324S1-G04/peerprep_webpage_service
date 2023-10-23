import { Logout, Settings } from '@mui/icons-material'
import {
  Divider,
  Dropdown,
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
import { userNavigationList } from '../../utils/constants/navigation'
import Avatar, { AvatarShape } from '../Avatar'
import NavigationBar from './NavigationBar'

const UserNavigationBar: React.FC = () => {
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
      <NavigationBar navigationList={userNavigationList}>
        <Dropdown>
          <MenuButton variant="plain" sx={styles.avatarMenuButton}>
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
  username: { width: 0, minWidth: '100%', fontSize: '1rem' } as SxProps,
  emailAddress: { width: 0, minWidth: '100%', fontSize: '0.8rem' } as SxProps,
}

export default UserNavigationBar
