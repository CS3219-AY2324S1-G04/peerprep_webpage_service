import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Box, Button, Input, Typography } from '@mui/joy'
import { Fragment, useEffect } from 'react'

import useGetRouteMatch from '../../hooks/useGetRouteMatch'
import ColorSchemeToggle from '../ColorSchemeToggle'

const GuestNavigationBar: React.FC = () => {
  const { isProblemsPage, isRankingsPage } = useGetRouteMatch()

  useEffect(() => {}, [isProblemsPage, isRankingsPage])

  return (
    <Fragment>
      <Box sx={styles.leftBox}></Box>
      <Box flex="1">
        <Typography level="logo">PeerPrep</Typography>
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
        <Button variant="plain" sx={styles.button}>
          Log in
        </Button>
        <Button size="md" sx={styles.button}>
          Sign up
        </Button>
      </Box>
    </Fragment>
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
} as const

export default GuestNavigationBar
