import { Box, Typography } from '@mui/joy'
import { Link as RouterLink } from 'react-router-dom'

import Paths from '../../utils/constants/navigation'

const FormFooter: React.FC<{
  leadingMessage: string
  linkMessage: string
  linkPath: Paths
}> = ({ leadingMessage, linkMessage, linkPath }) => {
  return (
    <Box sx={styles.container}>
      <Typography>{leadingMessage}</Typography>
      <Typography
        component={RouterLink}
        to={linkPath}
        color="primary"
        sx={styles.link}
      >
        {linkMessage}
      </Typography>
    </Box>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '4px',
  },
  link: { fontWeight: 'bold', textDecoration: 'none' },
}

export default FormFooter
