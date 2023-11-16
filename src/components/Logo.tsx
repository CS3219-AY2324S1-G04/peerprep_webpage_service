import { Box, Typography } from '@mui/joy'

import logo from '../assets/logo.png'

interface LogoProps {
  variant?: 'row' | 'full' | 'logo'
}

const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  const { variant = 'full' } = props
  const isRowVersion = variant === 'row'

  return (
    <Box sx={styles.wrapper} flexDirection={isRowVersion ? 'row' : 'column'}>
      {variant === 'full' && (
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
          <Typography level="body-xs" fontWeight="bold">
            Assignment 2
          </Typography>
        </>
      )}

      {variant === 'row' && (
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
              <Typography level="body-xs" fontWeight="bold">
                Assignment 2
              </Typography>
            </Box>
          </Box>
        </>
      )}

      {variant === 'logo' && (
        <>
          <Box display="block" alignItems="center">
            <img src={logo} alt="mainLogo" style={styles.logoImg} />
            <Typography level="body-xs" fontWeight="bold">
              Assignment 2
            </Typography>
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
