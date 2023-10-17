import { Box, Typography } from '@mui/joy'

const UserFormHeader: React.FC<{ title: string; message: string[] }> = ({
  title,
  message,
}) => {
  return (
    <Box sx={styles.container}>
      <Box component="img" src="/logo.png" sx={styles.logo} />
      <Typography sx={styles.title}>{title}</Typography>
      <Typography level="body-md" color="neutral" sx={styles.messageBody}>
        {message
          .map((item) => <>{item}</>)
          .reduce((prev, curr) => (
            <>
              {prev}
              <br />
              {curr}
            </>
          ))}
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
  title: { fontWeight: 'bold', fontSize: '1.875rem', textAlign: 'center' },
  messageBody: { textAlign: 'center' },
}

export default UserFormHeader
