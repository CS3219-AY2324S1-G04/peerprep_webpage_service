import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Box, Button, Input, List, ListItem, ListItemButton } from '@mui/joy'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRouteMatch } from '../../hooks/useRouteMatch'
import { guestNavigationList } from '../../utils/constants/navigation'
import ColorSchemeToggle from '../ColorSchemeToggle'
import Logo from '../Logo'

const GuestNavigationBar: React.FC = () => {
  const routeMatch = useRouteMatch()
  const navigate = useNavigate()

  return (
    <Fragment>
      <Box sx={styles.root}>
        <Box sx={styles.leftColumn}>
          <List role="menubar" orientation="horizontal" sx={styles.list}>
            {guestNavigationList.map((page, index) => {
              const isActivePage = routeMatch.getRouteMatch(page.url)
              return (
                <ListItem key={`${page.title}-${index}`}>
                  <ListItemButton
                    className={isActivePage ? 'active' : ''}
                    component="a"
                    sx={styles.listItemButton}
                    onClick={() => navigate(page.url)}
                  >
                    {page.title}
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
        <Box sx={styles.middleColumn}>
          <Logo />
        </Box>
        <Box sx={styles.rightColumn}>
          <Box sx={styles.rightColumnWrapper}>
            <Input
              size="md"
              variant="outlined"
              placeholder="Search"
              startDecorator={<SearchRoundedIcon color="primary" />}
              sx={styles.input}
            />
            <ColorSchemeToggle />
            <Button variant="plain" sx={styles.button}>
              Log in
            </Button>
            <Button size="md" sx={styles.button}>
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    width: '100%',
  },
  leftColumn: {
    gridColumn: '1 / 2',
  },
  middleColumn: {
    gridColumn: '2 / 3',
    paddingTop: 1,
    justifySelf: 'center',
  },
  rightColumn: {
    gridColumn: '3 / 4',
    display: 'flex',
    paddingTop: 2,
    paddingBottom: 2,
    alignItems: 'center',
  },
  list: {
    height: '100%',
    '.active': {
      borderColor: 'primary.500',
    },
  },
  listItemButton: {
    border: 'unset',
    borderBottom: '2px solid transparent',
  },
  button: {
    width: '40%',
  },
  input: {
    flexBasis: '500px',
    display: {
      xs: 'none',
      sm: 'flex',
    },
    boxShadow: 'sm',
  },
  rightColumnWrapper: {
    width: '100%',
    display: 'flex',
    height: '80%',
  },
} as const

export default GuestNavigationBar
