import { Box, Link, Typography } from '@mui/joy'
import { Link as RouterLink } from 'react-router-dom'

import Paths from '../../../utils/constants/navigation'

const SuccessMessage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Box component="img" src="/logo.png" sx={{ width: '50px' }} />
      <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>
        Sign Up Successful!
      </Typography>
      <Typography level="body-md" color="neutral" sx={{ textAlign: 'center' }}>
        You can now <span />
        <Link
          component={RouterLink}
          to={Paths.Login}
          color="primary"
          sx={{ fontWeight: 'bold', textDecoration: 'none' }}
        >
          Login
        </Link>
      </Typography>
    </Box>
  )
}

export default SuccessMessage
