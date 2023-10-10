import { Box, Link, Typography } from '@mui/joy'
import { Link as RouterLink } from 'react-router-dom'

import Paths from '../../utils/constants/navigation'

const FormSuccessMessage: React.FC<{
  title: string
  linkLeadingMessage: string
  linkMessage: string
  linkPath: Paths
}> = ({ title, linkLeadingMessage, linkMessage, linkPath }) => {
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
        {title}
      </Typography>
      <Typography level="body-md" color="neutral" sx={{ textAlign: 'center' }}>
        {linkLeadingMessage} <span />
        <Link
          component={RouterLink}
          to={linkPath}
          color="primary"
          sx={{ fontWeight: 'bold', textDecoration: 'none' }}
        >
          {linkMessage}
        </Link>
      </Typography>
    </Box>
  )
}

export default FormSuccessMessage
