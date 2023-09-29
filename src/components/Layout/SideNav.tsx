import Box, { BoxProps } from '@mui/joy/Box'

const SideNav: React.FC<BoxProps> = (props: BoxProps) => {
  return (
    <Box
      component="nav"
      className="Navigation"
      {...props}
      sx={[
        styles.sideNav,
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  )
}

const styles = {
  sideNav: {
    p: 2,
    bgcolor: 'background.surface',
    borderRight: '1px solid',
    borderColor: 'divider',
    display: {
      xs: 'none',
      sm: 'initial',
    },
  },
} as const

export default SideNav
