import Box, { BoxProps } from '@mui/joy/Box'

const Root: React.FC<BoxProps> = (props: BoxProps) => {
  return (
    <Box
      {...props}
      sx={[
        {
          height: '100%',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  )
}

export default Root
