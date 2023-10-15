import { Table } from '@mui/joy'

import { TableBody, TableCell, TableRow } from './TableBody'
import { TableColumnHead, TableHead } from './TableHead'
import { TablePagination } from './TablePagination'
import { TableSearchBox } from './TableSearch'
import { useTable } from './hooks/useTable'

interface TableProps {
  children: React.ReactNode
}

export const CommonTable = (props: TableProps) => {
  const { children, ...rest } = props
  return (
    <Table
      {...rest}
      aria-labelledby="tableTitle"
      stickyHeader
      sx={styles.tableRoot}
    >
      {children}
    </Table>
  )
}

CommonTable.Body = TableBody
CommonTable.Row = TableRow
CommonTable.Cell = TableCell

CommonTable.Header = TableHead
CommonTable.ColumnHead = TableColumnHead
CommonTable.Pagination = TablePagination
CommonTable.Search = TableSearchBox

CommonTable.useTable = useTable

const styles = {
  tableRoot: {
    '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
    '--Table-headerUnderlineThickness': '1px',
    '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
    '--TableCell-paddingY': '4px',
    '--TableCell-paddingX': '8px',
  },
} as const
