import { Logout, Settings } from '@mui/icons-material'
import {
  Avatar,
  Dropdown,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Theme,
} from '@mui/joy'
import React, { useState } from 'react'

import AccountSettingsModal from '../../features/accountSettingsEditor/components/AccountSettingsModal'
import { getUsername } from '../../features/user/selector'
import { useAppSelector } from '../../hooks/useAppSelector'
import { userNavigationList } from '../../utils/constants/navigation'
import NavigationBar from './NavigationBar'

const UserNavigationBar: React.FC = () => {
  const username = useAppSelector(getUsername)

  const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] =
    useState(false)

  function openEditAccountSettings() {
    setIsAccountSettingsModalOpen(true)
  }

  return (
    <>
      <NavigationBar navigationList={userNavigationList}>
        <Dropdown>
          <MenuButton variant="plain" sx={{ padding: 0 }}>
            <Avatar alt={username} variant="solid" size="md" />
          </MenuButton>
          <Menu
            sx={(theme: Theme) => {
              return { zIndex: theme.zIndex.tooltip }
            }}
          >
            <MenuItem onClick={openEditAccountSettings}>
              <ListItemDecorator>
                <Settings />
              </ListItemDecorator>
              Edit Account Settings
            </MenuItem>
            <MenuItem>
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

export default UserNavigationBar
