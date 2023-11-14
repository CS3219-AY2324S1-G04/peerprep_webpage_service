import { useColorScheme } from '@mui/joy'
import Box, { BoxProps } from '@mui/joy/Box'

const Root: React.FC<BoxProps> = (props: BoxProps) => {
  const { mode } = useColorScheme()

  return (
    <Box
      {...props}
      sx={[
        {
          height: '100%',
          backgroundColor:
            mode === 'light'
              ? 'var(--joy-palette-background-level1) !important'
              : '',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  )
}

export default Root
