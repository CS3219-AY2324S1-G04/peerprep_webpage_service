import { Box, Typography } from '@mui/joy'

const FormHeader: React.FC<{ title: string; message: string[] }> = ({
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
    gap: '8px',
  },
  logo: { width: '50px' },
  title: { fontWeight: 'bold', fontSize: '30px' },
  messageBody: { textAlign: 'center' },
}

export default FormHeader
