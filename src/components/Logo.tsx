import { Box, Typography } from '@mui/joy'

import logo from '../assets/logo.png'
import { getUserRole } from '../features/user/selector'
import { useAppSelector } from '../hooks/useAppSelector'
import { UserRole } from '../services/userService'

const Logo: React.FC = () => {
  const userRole = useAppSelector(getUserRole)

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
      {userRole === UserRole.admin && (
        <Typography level="body-xs" fontWeight="bold" color="danger">
          Admin
        </Typography>
      )}
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
    lineHeight: '1',
  },
  adminFlag: {
    border: '1px solid',
    borderRadius: '4px',
  },
} as const

export default Logo
