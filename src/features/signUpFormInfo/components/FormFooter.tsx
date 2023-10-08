import { Box, Typography } from '@mui/joy'
import { Link as RouterLink } from 'react-router-dom'

import Paths from '../../../utils/constants/navigation'

const FormFooter: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '4px',
      }}
    >
      <Typography>Already have an account?</Typography>
      <Typography
        component={RouterLink}
        to={Paths.Login}
        color="primary"
        sx={{ fontWeight: 'bold', textDecoration: 'none' }}
      >
        Login
      </Typography>
    </Box>
  )
}

export default FormFooter
