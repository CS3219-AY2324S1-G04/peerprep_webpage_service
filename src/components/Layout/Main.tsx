import { useColorScheme, useTheme } from '@mui/joy'
import Box, { BoxProps } from '@mui/joy/Box'

const Main: React.FC<BoxProps> = (props: BoxProps) => {
  const theme = useTheme()
  const { mode } = useColorScheme()
  return (
    <Box
      color=""
      component="main"
      className="Main"
      {...props}
      sx={[
        {
          p: 2,
          bgcolor:
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
