import { PropsWithChildren } from 'react'

import { Box, Sheet, Stack, useTheme } from '@mui/joy'
import Header from './Header'

const TableContainer = (props: PropsWithChildren) => {
  const { children } = props
  const theme = useTheme()
  return (
    <Sheet sx={{
      ...styles.root,
      [theme.breakpoints.down('md')]: {
        width: '100%',
      }
    }}>
      <Stack spacing={2}>
        {children}
      </Stack>
    </Sheet>
  )
}

const styles = {
  root: {
    borderRadius: '10px',
    padding: 3,
    margin: 'auto',
    width: '80%',
    maxWidth: '1200px',
  }
} as const

TableContainer.Header = Header
TableContainer.Subheader = Box
TableContainer.Body = Box

export default TableContainer
