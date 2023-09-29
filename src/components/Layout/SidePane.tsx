import Box, { BoxProps } from '@mui/joy/Box'

const SidePane: React.FC<BoxProps> = (props: BoxProps) => {
  return (
    <Box
      {...props}
      sx={[
        styles.sidePane,
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  )
}

const styles = {
  sidePane: {
    bgcolor: 'background.surface',
    borderRight: '1px solid',
    borderColor: 'divider',
    display: {
      xs: 'none',
      md: 'initial',
    },
  },
} as const

export default SidePane
