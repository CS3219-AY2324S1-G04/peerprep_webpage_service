import { Box, Sheet } from '@mui/joy'

import LoginForm from '../features/loginForm/components/Form'

const Login: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '50px 0px',
      }}
    >
      <Sheet
        variant="soft"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '510px',
          padding: '48px 0px',
          boxShadow: 'sm',
          borderRadius: 'sm',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '365px',
            maxWidth: '365px',
          }}
        >
          <LoginForm />
        </Box>
      </Sheet>
    </Box>
  )
}

export default Login
