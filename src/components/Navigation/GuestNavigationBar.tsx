import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Box, Button, Input, Typography } from '@mui/joy'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import useGetRouteMatch from '../../hooks/useGetRouteMatch'
import Paths from '../../utils/constants/navigation'
import ColorSchemeToggle from '../ColorSchemeToggle'

const GuestNavigationBar: React.FC = () => {
  const { isProblemsPage, isRankingsPage } = useGetRouteMatch()

  useEffect(() => {}, [isProblemsPage, isRankingsPage])

  return (
    <>
      <Box sx={styles.leftBox}></Box>
      <Box flex="1">
        <Link to="/" style={styles.link}>
          <Typography level="logo">PeerPrep</Typography>
        </Link>
      </Box>
      <Box sx={styles.rightBox}>
        <Input
          size="md"
          variant="outlined"
          placeholder="Search"
          startDecorator={<SearchRoundedIcon color="primary" />}
          sx={styles.input}
        />
        <ColorSchemeToggle />
        <Button
          variant="plain"
          sx={styles.button}
          component={Link}
          to={Paths.Login}
        >
          Login
        </Button>
        <Button size="md" sx={styles.button} component={Link} to={Paths.SignUp}>
          Sign up
        </Button>
      </Box>
    </>
  )
}

const styles = {
  leftBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1.5,
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1.5,
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
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
} as const

export default GuestNavigationBar
