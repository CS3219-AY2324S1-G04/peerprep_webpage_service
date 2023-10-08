import { Sheet } from '@mui/joy'
import { Box } from '@mui/material'

import SignUpForm from '../features/signUpFormInfo/components/Form'

const SignUp: React.FC = () => {
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
          <SignUpForm />
        </Box>
      </Sheet>
    </Box>
  )
}

export default SignUp
