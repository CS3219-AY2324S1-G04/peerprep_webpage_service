import { ChipDelete, styled } from '@mui/joy'

const StyledChipDelete = styled(ChipDelete)(({ theme }) => ({
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.vars.palette.neutral.lightChannel,
  },
}))

export default StyledChipDelete
