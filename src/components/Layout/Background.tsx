import { Box, BoxProps, Theme, useColorScheme } from '@mui/joy'

const Background: React.FC<BoxProps> = (props: BoxProps) => {
  const { mode } = useColorScheme()
  return <Box {...props} sx={styles.background(mode)} />
}

const styles = {
  background: (mode: string | undefined) => {
    return {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      bgcolor: (theme: Theme) =>
        mode === 'light'
          ? theme.vars.palette.background.level1
          : theme.vars.palette.background.body,
    }
  },
}

export default Background
