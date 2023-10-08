import { Box, Typography } from '@mui/joy'

const FormHeader: React.FC = () => {
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
        Welcome to PeerPrep! 👋🏼
      </Typography>
      <Typography level="body-md" color="neutral" sx={{ textAlign: 'center' }}>
        Hello, I guess you are new around here.
        <br />
        Let's start by creating your account!
      </Typography>
    </Box>
  )
}

export default FormHeader
