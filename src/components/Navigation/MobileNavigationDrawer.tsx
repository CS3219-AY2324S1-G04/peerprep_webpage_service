import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { Box, Typography } from '@mui/joy'
import Drawer from '@mui/joy/Drawer'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageNavigation } from '../../utils/constants/navigation'

interface MobileNavigationDrawerProps {
  isOpen: boolean
  toggleDrawer: (value: boolean) => void
  list: PageNavigation[]
}

const MobileNavigationDrawer: React.FC<MobileNavigationDrawerProps> = (
  props: MobileNavigationDrawerProps,
) => {
  const { isOpen, toggleDrawer, list } = props
  const navigate = useNavigate()
  const [openSubMenuId, setOpenSubMenuId] = useState<number>(-1)

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer open={isOpen} onClose={() => toggleDrawer(false)}>
        <Box role="presentation">
          <List>
            {list.map((page, index) => {
              const hasSubPages = page.subPages && page.subPages.length > 0

              if (hasSubPages) {
                const open = openSubMenuId === index
                return (
                  <ListItem
                    key={`${page.title}-${index}`}
                    nested
                    endAction={
                      <KeyboardArrowDown
                        sx={{ transform: open ? 'initial' : 'rotate(-90deg)' }}
                      />
                    }
                  >
                    <ListItem>
                      <ListItemButton
                        onClick={() => {
                          if (open) {
                            setOpenSubMenuId(-1)
                          } else {
                            setOpenSubMenuId(index)
                          }
                        }}
                      >
                        <Typography
                          level="inherit"
                          sx={{
                            fontWeight: open ? 'bold' : undefined,
                            color: open ? 'text.primary' : 'inherit',
                          }}
                        >
                          {page.title}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                    {open && (
                      <List
                        sx={{ borderLeft: '1px solid grey', marginLeft: 1 }}
                      >
                        {page.subPages?.map((subPage) => (
                          <ListItem key={subPage.title}>
                            <ListItemButton
                              disabled={subPage.disabled}
                              onClick={() => {
                                navigate(subPage.url ?? '')
                                toggleDrawer(false)
                              }}
                            >
                              {subPage.title} {subPage.disabled && '🚧'}
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </ListItem>
                )
              }

              return (
                <ListItem key={`${page.title}-${index}`}>
                  <ListItemButton
                    onClick={() => {
                      navigate(page.url ?? '')
                      toggleDrawer(false)
                    }}
                  >
                    {page.title}
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}

export default MobileNavigationDrawer
