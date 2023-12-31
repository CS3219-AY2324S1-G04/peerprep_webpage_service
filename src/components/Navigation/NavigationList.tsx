import { ClickAwayListener, Popper } from '@mui/base'
import { KeyboardArrowDown } from '@mui/icons-material'
import { List, ListItem, ListItemButton, Theme } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { useRouteMatch } from '../../hooks/useRouteMatch'
import { PageNavigation } from '../../utils/constants/navigation'

export interface NavigationListProps {
  list: PageNavigation[]
}

const NavigationList: React.FC<NavigationListProps> = (
  props: NavigationListProps,
) => {
  const { list } = props
  const routeMatch = useRouteMatch()
  const navigate = useNavigate()

  return (
    <List role="menubar" orientation="horizontal" sx={styles.list}>
      {list.map((page, index) => {
        const hasSubPages = page.subPages && page.subPages.length > 0

        if (hasSubPages) {
          let isAnySubPageActive = false
          for (const subPage of page.subPages ?? []) {
            const isSubPageActive =
              subPage.url && routeMatch.getRouteMatch(subPage.url)
            if (isSubPageActive) {
              isAnySubPageActive = true
              break
            }
          }
          return (
            <ListItemWithMenu
              key={`${page.title}-${index}`}
              page={page}
              navigate={navigate}
              isActivePage={isAnySubPageActive}
            />
          )
        }

        const isActivePage = page.url && routeMatch.getRouteMatch(page.url)

        return (
          <ListItem key={`${page.title}-${index}`}>
            <ListItemButton
              className={isActivePage ? 'active' : ''}
              component="a"
              sx={styles.listItemButton}
              onClick={() => navigate(page.url ?? '')}
            >
              {page.title}
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

const styles = {
  list: {
    height: '100%',
    '.active': {
      borderColor: 'primary.500',
    },
  } as SxProps,
  listItemButton: {
    border: 'unset',
    borderBottom: '2px solid transparent',
  } as SxProps,
} as const

interface ListItemWithMenuProps {
  page: PageNavigation
  navigate: NavigateFunction
  isActivePage: boolean
}

const ListItemWithMenu: React.FC<ListItemWithMenuProps> = (
  props: ListItemWithMenuProps,
) => {
  const { page, isActivePage } = props
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'menu-popper' : undefined
  const navigate = useNavigate()

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <div style={{ display: 'flex' }} onMouseLeave={() => setAnchorEl(null)}>
        <ListItemButton
          sx={styles.listItemButton}
          className={isActivePage ? 'active' : ''}
          onFocus={(event) => setAnchorEl(event.currentTarget)}
          onMouseEnter={(event) => {
            setAnchorEl(event.currentTarget)
          }}
        >
          {page.title}&nbsp;
          <KeyboardArrowDown />
        </ListItemButton>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          disablePortal
          keepMounted
        >
          <List
            role="menu"
            aria-label="About"
            variant="outlined"
            sx={listItemStyles.list}
          >
            {page.subPages?.map((subPage) => (
              <ListItem key={subPage.title}>
                <ListItemButton
                  disabled={subPage.disabled}
                  onClick={() => navigate(subPage.url ?? '')}
                >
                  {subPage.title} {subPage.disabled && '🚧'}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

const listItemStyles = {
  list: ((theme: Theme) => {
    return {
      my: 2,
      boxShadow: 'md',
      borderRadius: 'sm',
      minWidth: 180,
      backgroundColor: theme.vars.palette.background.body,
      '--List-radius': '8px',
      '--List-padding': '4px',
      '--ListDivider-gap': '4px',
    }
  }) as SxProps,
} as const

export default NavigationList
