import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton'
import * as React from 'react'
// icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { getPaginationItems } from '../../utils/pagination'

interface TablePaginationProps {
  currentPage: number
  lastPage: number
  maxLength: number
  onPageChange: (newPage: number) => void
}

export const TablePagination: React.FC<TablePaginationProps> = (props: TablePaginationProps) => {
  const { currentPage, lastPage, maxLength, onPageChange } = props
  const pageNumbers = getPaginationItems(currentPage, lastPage, maxLength)

  return (
    <Box
      className="Pagination-laptopUp"
      sx={{
        pt: 2,
        gap: 1,
        [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
        display: {
          xs: 'none',
          md: 'flex',
        },
        '.activePage': {
          backgroundColor: (theme) => theme.vars.palette.neutral.outlinedActiveBg
        }
      }}
    >
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardArrowLeftIcon />}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <Box sx={{ 
        flex: 1,
      }} />
      {pageNumbers.map((pageNum, idx) => (
        <IconButton
          className={currentPage === pageNum ? 'activePage' : ''}
          key={idx}
          size="sm"
          variant={Number(pageNum) ? 'outlined' : 'plain'}
          color="neutral"
          onClick={() => onPageChange(pageNum)}
          disabled={isNaN(pageNum)}
        >
          {!isNaN(pageNum) ? pageNum : '...'}
        </IconButton>
      ))}
      <Box sx={{ flex: 1 }} />

      <Button
        disabled={currentPage === lastPage}
        size="sm"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardArrowRightIcon />}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </Box>
  )
}
