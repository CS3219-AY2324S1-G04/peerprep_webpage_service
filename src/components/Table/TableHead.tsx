import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Link } from '@mui/joy'
import { visuallyHidden } from '@mui/utils'
import * as React from 'react'

import { SortDirection } from '../../utils/types'

interface TableHeadProps {
  sortKey?: string
  sortDir?: SortDirection
  onSort?: (newSortKey: string) => void
  children: React.ReactNode
}

export const TableHead: React.FC<TableHeadProps> = (props: TableHeadProps) => {
  const { sortKey = '', sortDir = false, onSort, children, ...rest } = props
  const hasSorting = sortDir && sortKey && onSort ? true : false
  const headers = !hasSorting
    ? children
    : React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            onSort,
            sortDir: child.props.id === sortKey ? sortDir : false,
            sortable: !hasSorting ? false : child.props.sortable,
          })
        }
      })
  return (
    <thead {...rest}>
      <tr>{headers}</tr>
    </thead>
  )
}

interface TableSortLabelProps {
  active: boolean
  direction: SortDirection
  onClick: () => void
  children: React.ReactNode
}

const TableSortLabel: React.FC<TableSortLabelProps> = (
  props: TableSortLabelProps,
) => {
  const { active, direction, onClick, children } = props

  return (
    <Link
      underline="none"
      color="neutral"
      textColor={active ? 'primary.plainColor' : undefined}
      component="button"
      onClick={onClick}
      fontWeight="lg"
      endDecorator={<ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />}
      sx={{
        '& svg': {
          transition: '0.2s',
          transform:
            active && direction === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
        },
        '&:hover': { '& svg': { opacity: 1 } },
      }}
    >
      {children}
    </Link>
  )
}

interface TableColumnHeadProps {
  id: string
  sortable?: boolean
  sortDir?: SortDirection
  onSort?: (newSortKey: string) => void
  cellProps?: React.ThHTMLAttributes<HTMLTableCellElement>
  children: React.ReactNode
}

export const TableColumnHead: React.FC<TableColumnHeadProps> = (
  props: TableColumnHeadProps,
) => {
  const { id, children, cellProps, sortable = true, sortDir, onSort } = props
  const canSort = onSort && sortable

  return (
    <th key={id} {...cellProps}>
      {canSort ? (
        <TableSortLabel
          active={!!sortDir}
          direction={sortDir || SortDirection.Ascending}
          onClick={() => onSort(id)}
        >
          {children}
          {canSort ? (
            <span style={visuallyHidden}>
              {sortDir === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </span>
          ) : null}
        </TableSortLabel>
      ) : (
        children
      )}
    </th>
  )
}
