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

import { getUsername } from '../../features/user/selector'
import { useAppSelector } from '../../hooks/useAppSelector'
import { userNavigationList } from '../../utils/constants/navigation'
import NavigationBar from './NavigationBar'

const UserNavigationBar: React.FC = () => {
  const username = useAppSelector(getUsername)

  return (
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
          <MenuItem>
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
  )
}

export default UserNavigationBar
