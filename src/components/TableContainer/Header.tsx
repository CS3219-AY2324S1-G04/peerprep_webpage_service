import { Box, Typography } from '@mui/joy'

import Chip from '../Chip'
import { SxProps } from '@mui/joy/styles/types'

export interface HeaderProps {
  title: string
  children?: React.ReactNode
  chipLabel?: string
  headerStyles?: SxProps
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, chipLabel, headerStyles, children } = props

  return (
    <Box display="flex" alignItems="center" sx={headerStyles}>
      <Box display="flex" height="fit-content">
        <Typography level="h3">{title}</Typography>
        {chipLabel && <Chip sx={styles.chip}>{chipLabel}</Chip>}
      </Box>
      {children}
    </Box>
  )
}

const styles = {
  chip: {
    ml: 1,
  },
} as const

export default Header
