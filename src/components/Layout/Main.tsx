import { useColorScheme } from '@mui/joy'
import Box, { BoxProps } from '@mui/joy/Box'

const Main: React.FC<BoxProps> = (props: BoxProps) => {
  const { mode } = useColorScheme()
  return (
    <Box
      color=""
      component="main"
      className="Main"
      {...props}
      sx={[
        {
          height: 'fit-content',
          p: 2,
          bgcolor: (theme) =>
            mode === 'light'
              ? theme.vars.palette.background.level1
              : theme.vars.palette.background.body,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  )
}

export default Main
