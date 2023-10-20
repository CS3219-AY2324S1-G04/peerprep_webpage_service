import Box, { BoxProps } from '@mui/joy/Box'

const Header: React.FC<BoxProps> = (props: BoxProps) => {
  return (
    <Box
      component="header"
      className="Header"
      {...props}
      sx={[styles.header, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
    />
  )
}

const styles = {
  header: {
    px: 2,
    gap: 2,
    bgcolor: 'background.surface',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridColumn: '1 / -1',
    borderBottom: '1px solid',
    borderColor: 'divider',
    position: 'sticky',
    top: 0,
    zIndex: 1100,
  },
} as const

export default Header
