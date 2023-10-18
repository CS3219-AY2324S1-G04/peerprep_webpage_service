import { Box, Typography } from '@mui/joy'

import logo from '../assets/logo.png'

const Logo: React.FC = () => {
  return (
    <Box sx={styles.wrapper}>
      <img src={logo} alt="mainLogo" style={styles.logoImg} />
      <Box sx={styles.textWrapper}>
        <Typography level="logo" color="primary">
          Peer
        </Typography>
        <Typography component="span" level="logo">
          Prep
        </Typography>
      </Box>
    </Box>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoImg: {
    width: '28px',
  },
  textWrapper: {
    display: 'inline-flex',
  },
} as const

export default Logo
