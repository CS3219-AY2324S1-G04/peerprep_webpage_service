import { Box, Sheet, Stack, useTheme } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { PropsWithChildren } from 'react'

import Header from './Header'

interface TableContainerProps extends PropsWithChildren {
  sx?: SxProps
}

const TableContainer = (props: TableContainerProps) => {
  const { sx, children } = props
  const theme = useTheme()
  return (
    <Sheet
      sx={{
        ...styles.root,
        [theme.breakpoints.down('md')]: {
          width: '100%',
        },
        ...sx,
      }}
    >
      <Stack spacing={2}>{children}</Stack>
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
  },
} as const

TableContainer.Header = Header
TableContainer.Subheader = Box
TableContainer.Body = Box

export default TableContainer
