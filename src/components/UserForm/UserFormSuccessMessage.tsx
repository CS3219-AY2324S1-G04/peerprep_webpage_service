import { Box, Link, Typography } from '@mui/joy'
import { Link as RouterLink } from 'react-router-dom'

import Paths from '../../utils/constants/navigation'

const UserFormSuccessMessage: React.FC<{
  title: string
  linkLeadingMessage: string
  linkMessage: string
  linkPath: Paths
}> = ({ title, linkLeadingMessage, linkMessage, linkPath }) => {
  return (
    <Box sx={styles.container}>
      <Box component="img" src="/logo.png" sx={styles.logo} />
      <Typography sx={styles.title}>{title}</Typography>
      <Typography level="body-md" color="neutral" sx={styles.messageBody}>
        {linkLeadingMessage} <span />
        <Link
          component={RouterLink}
          to={linkPath}
          color="primary"
          sx={styles.link}
        >
          {linkMessage}
        </Link>
      </Typography>
    </Box>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logo: { width: '3.125rem' },
  title: { fontWeight: 'bold', fontSize: '1.875rem' },
  messageBody: { textAlign: 'center' },
  link: { fontWeight: 'bold', textDecoration: 'none' },
}

export default UserFormSuccessMessage
