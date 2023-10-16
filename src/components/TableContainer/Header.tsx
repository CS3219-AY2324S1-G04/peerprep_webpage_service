import { Box, Typography } from '@mui/joy'

import Chip from '../Chip'

export interface HeaderProps {
  title: string
  chipLabel?: string
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, chipLabel } = props

  return (
    <Box display="flex">
      <Typography level="h3">{title}</Typography>
      {chipLabel && <Chip sx={styles.chip}>{chipLabel}</Chip>}
    </Box>
  )
}

const styles = {
  chip: {
    ml: 1,
  },
} as const

export default Header
