import { Box, Typography } from '@mui/joy'

const FormHeader: React.FC<{ title: string; body: string[] }> = ({
  title,
  body,
}) => {
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
        {body
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

export default FormHeader
