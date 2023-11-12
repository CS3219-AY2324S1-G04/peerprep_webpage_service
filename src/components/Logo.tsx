import { Box, Typography } from '@mui/joy'

import logo from '../assets/logo.png'
import { getUserRole } from '../features/user/selector'
import { useAppSelector } from '../hooks/useAppSelector'
import { UserRole } from '../services/userService'

interface LogoProps {
  variant?: 'row' | 'full'
}

const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  const { variant = 'full' } = props
  const userRole = useAppSelector(getUserRole)
  const isRowVersion = variant === 'row'

  return (
    <Box sx={styles.wrapper} flexDirection={isRowVersion ? 'row' : 'column'}>
      {!isRowVersion ? (
        <>
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
            <Typography
              level="body-xs"
              fontWeight="bold"
              color="danger"
              mt="-5px"
            >
              Admin
            </Typography>
          )}
        </>
      ) : (
        <>
          <Box sx={styles.textWrapper} alignItems="center">
            <img src={logo} alt="mainLogo" style={styles.logoImg} />
            <Box flexDirection="column">
              <Box sx={styles.textWrapper}>
                <Typography level="logo" color="primary">
                  Peer
                </Typography>
                <Typography component="span" level="logo">
                  Prep
                </Typography>
              </Box>
              {userRole === UserRole.admin && (
                <Typography
                  level="body-xs"
                  fontWeight="bold"
                  color="danger"
                  mt="-5px"
                >
                  Admin
                </Typography>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    width: '28px',
  },
  textWrapper: {
    display: 'inline-flex',
    lineHeight: '1',
  },
} as const

export default Logo
