import { Chip, styled } from '@mui/joy'

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.vars.palette.primary[50]
      : theme.vars.palette.primary[600],
  color:
    theme.palette.mode === 'light'
      ? theme.vars.palette.primary[700]
      : theme.vars.palette.common.white,
}))

export default StyledChip
