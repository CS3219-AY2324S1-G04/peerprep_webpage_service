import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ReplayIcon from '@mui/icons-material/Replay'
import {
  Box,
  Button,
  Dropdown,
  IconButton,
  Chip as JoyChip,
  Menu,
  MenuButton,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Chip from '../../../components/Chip'
import ChipDelete from '../../../components/ChipDelete'
import { CommonTable as Table } from '../../../components/Table/Table'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { SubPaths } from '../../../utils/constants/navigation'
import { SortDirection } from '../../../utils/types'
import { getComplexityColor } from '../../../utils/uiHelpers'
import { getCategories, getQuestionsList } from '../selectors'
import { setSelectedQuestionId } from '../slice'
import { MinimalQuestion, QuestionComplexity } from '../types'
import ConfirmDeleteModal from './ConfirmDeleteModal'

interface ProblemsTableProps {
  adminMode?: boolean
  onQuestionClick: () => void
}
interface Filter {
  columnFilterKey: string
  value: string
}

const MAX_CATEGORIES_TO_DISPLAY = 2

// TODO: Add status column when necessary services are ready
// Status column should only be added for logged in users
export default function ProblemsTable(props: ProblemsTableProps) {
  const { adminMode, onQuestionClick } = props
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<Filter[]>([])

  const questionsList = useAppSelector(getQuestionsList)
  const allCategories = useAppSelector(getCategories)
  const { items, sorting, paging, filtering } = Table.useTable<MinimalQuestion>(
    questionsList,
    {
      sortKey: 'title',
      sortDir: SortDirection.Ascending,
      searchFilterKeys: ['title', 'categories', 'complexity'],
      columnFilterKeys: ['categories', 'complexity'],
      pageSize: 10,
    },
  )

  const getCategoriesToDisplay = (categories: string[]) => {
    // first 2 categories
    const categoriesToDisplay = categories.slice(0, MAX_CATEGORIES_TO_DISPLAY)
    const remainingCatgoriesCount =
      categories.length - categoriesToDisplay.length
    if (remainingCatgoriesCount > 0) {
      categoriesToDisplay.push(`+${remainingCatgoriesCount.toString()}`)
    }
    return categoriesToDisplay
  }

  const getExtraCategories = (categories: string[]) => {
    return categories.slice(MAX_CATEGORIES_TO_DISPLAY)
  }

  const onClickComplexityFilter = (complexityValue: string) => {
    const filterValues = [complexityValue]
    filtering.setFilterColumns(
      new Map(filtering.filterColumns.set('complexity', filterValues)),
    )

    const updatedFilters = filters
    const currentFilterIdx = filters.findIndex(
      (f) => f.columnFilterKey === 'complexity',
    )
    if (currentFilterIdx !== -1) {
      updatedFilters[currentFilterIdx] = {
        columnFilterKey: 'complexity',
        value: complexityValue,
      }
    } else {
      updatedFilters.push({
        columnFilterKey: 'complexity',
        value: complexityValue,
      })
    }
    setFilters(updatedFilters)
  }

  const onClickCategoryFilter = (category: string) => {
    const filterValues = filtering.filterColumns.get('categories') ?? []
    if (!filterValues.includes(category)) {
      filterValues.push(category)
      filtering.setFilterColumns(
        new Map(filtering.filterColumns.set('categories', filterValues)),
      )

      const updatedFilters = filters
      updatedFilters.push({ columnFilterKey: 'categories', value: category })
      setFilters(updatedFilters)
    }
  }

  const onDeleteFilterChip = (filterObj: Filter) => {
    const existingFilterValues =
      filtering.filterColumns.get(filterObj.columnFilterKey) ?? []
    const updatedFilterValues = existingFilterValues.filter(
      (value) => value !== filterObj.value,
    )

    filtering.setFilterColumns(
      new Map(
        filtering.filterColumns.set(
          filterObj.columnFilterKey,
          updatedFilterValues,
        ),
      ),
    )
    setFilters(
      filters.filter(
        (f) =>
          !(
            f.columnFilterKey === filterObj.columnFilterKey &&
            f.value === filterObj.value
          ),
      ),
    )
  }

  return (
    <div>
      <Box sx={styles.subheaderRow}>
        <Box sx={styles.filterDropdownsWrapper}>
          <Dropdown>
            <MenuButton endDecorator={<ArrowDropDown />}>Complexity</MenuButton>
            <Menu sx={styles.complexityMenu}>
              {Object.keys(QuestionComplexity).map((complexityValue) => (
                <MenuItem
                  key={complexityValue}
                  onClick={() => onClickComplexityFilter(complexityValue)}
                >
                  {complexityValue}
                </MenuItem>
              ))}
            </Menu>
          </Dropdown>
          <Dropdown>
            <MenuButton endDecorator={<ArrowDropDown />}>Category</MenuButton>
            <Menu
              onKeyDown={(e) => e.stopPropagation()}
              sx={styles.categoriesMenu}
            >
              {allCategories.map((category) => (
                <MenuItem
                  key={category}
                  onClick={() => onClickCategoryFilter(category)}
                >
                  {category}
                </MenuItem>
              ))}
            </Menu>
          </Dropdown>
        </Box>
        <Table.Search
          value={filtering.filterText}
          onChange={filtering.setFilterText}
        />
      </Box>
      <Box
        sx={{
          ...styles.filtersRow,
          display: filters.length > 0 ? 'flex' : 'none',
        }}
      >
        <Box sx={styles.filtersBox}>
          {filters.map((filterObj) => (
            <Chip
              sx={styles.filterChip}
              key={`${filterObj.columnFilterKey}:${filterObj.value}`}
              endDecorator={
                <ChipDelete onClick={() => onDeleteFilterChip(filterObj)} />
              }
            >
              {filterObj.value}
            </Chip>
          ))}
        </Box>
        <Button
          size="sm"
          variant="plain"
          startDecorator={<ReplayIcon />}
          onClick={() => {
            setFilters([])
            filtering.setFilterText('')
            filtering.setFilterColumns(new Map([]))
          }}
        >
          Reset
        </Button>
      </Box>
      <Table>
        <Table.Header {...sorting}>
          <Table.ColumnHead
            id="title"
            cellProps={{ style: styles.widerColumnHead }}
          >
            Title
          </Table.ColumnHead>
          <Table.ColumnHead
            sortable={false}
            id="categories"
            cellProps={{ style: styles.widerColumnHead }}
          >
            Categories
          </Table.ColumnHead>
          <Table.ColumnHead id="complexity">Complexity</Table.ColumnHead>
          {!adminMode && (
            <Table.ColumnHead id="successRate">Success Rate</Table.ColumnHead>
          )}
          {adminMode && <Table.ColumnHead id="manageActions" />}
        </Table.Header>
        <Table.Body>
          {items.length > 0 &&
            items.map((item: MinimalQuestion) => (
              <Table.Row key={item._id}>
                <Table.Cell>
                  <Typography
                    component="span"
                    sx={{
                      ...styles.titleText,
                      '&:hover': {
                        color: theme.vars.palette.primary[600],
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => {
                      dispatch(setSelectedQuestionId(item._id))
                      onQuestionClick()
                    }}
                  >
                    {item.title}
                  </Typography>
                </Table.Cell>
                <Table.Cell>
                  <Box sx={styles.problemCategoriesBox}>
                    {getCategoriesToDisplay(item.categories).map(
                      (category: string, index: number) => {
                        const isExtraCategoriesCount = index === 2
                        if (isExtraCategoriesCount) {
                          return (
                            <Tooltip
                              key={`${category}-${index}`}
                              sx={styles.tooltip}
                              title={
                                <Box sx={styles.nestedCategoriesBox}>
                                  {getExtraCategories(item.categories).map(
                                    (nestedCategory, nestedIndex) => (
                                      <Chip
                                        key={`${nestedCategory}-${nestedIndex}`}
                                      >
                                        {nestedCategory}
                                      </Chip>
                                    ),
                                  )}
                                </Box>
                              }
                              variant="outlined"
                              placement="top"
                            >
                              <JoyChip key={category}>{category}</JoyChip>
                            </Tooltip>
                          )
                        }

                        return <Chip key={category}>{category}</Chip>
                      },
                    )}
                  </Box>
                </Table.Cell>
                <Table.Cell>
                  <Typography
                    fontWeight="bold"
                    color={getComplexityColor(item.complexity)}
                  >
                    {item.complexity}
                  </Typography>
                </Table.Cell>
                {!adminMode && <Table.Cell>0.00%</Table.Cell>}
                {adminMode && (
                  <Table.Cell>
                    <Box sx={styles.actionsBox}>
                      <IconButton variant="plain">
                        <DeleteIcon
                          onClick={() => {
                            dispatch(setSelectedQuestionId(item._id))
                            setIsDeleteModalOpen(true)
                          }}
                        />
                      </IconButton>
                      <IconButton variant="plain">
                        <EditIcon
                          onClick={() => {
                            dispatch(setSelectedQuestionId(item._id))
                            navigate(
                              SubPaths.EditQuestion.replace(':id', item._id),
                            )
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Table.Pagination
        currentPage={paging.currentPage}
        lastPage={paging.totalPages}
        onPageChange={paging.goTo}
        maxLength={7}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

const styles = {
  filterDropdownsWrapper: {
    display: 'flex',
    columnGap: 1,
  } as SxProps,
  complexityMenu: {
    minWidth: 130,
  } as SxProps,
  categoriesMenu: {
    minWidth: 130,
    maxHeight: 200,
    overflowY: 'auto',
  } as SxProps,
  subheaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 1,
    mb: 2,
  } as SxProps,
  filtersRow: {
    justifyContent: 'space-between',
    mb: 2,
    alignItems: 'center',
  } as SxProps,
  filtersBox: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: 1,
    rowGap: 1,
  } as SxProps,
  filterChip: {
    height: 'fit-content',
  } as SxProps,
  widerColumnHead: {
    width: '35%',
  },
  titleText: {
    width: 'fit-content',
    transition: 'color .3s',
  } as SxProps,
  problemCategoriesBox: {
    display: 'flex',
    columnGap: 1,
    rowGap: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  } as SxProps,
  nestedCategoriesBox: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '200px',
    gap: '8px',
  } as SxProps,
  tooltip: {
    cursor: 'help',
  } as SxProps,
  actionsBox: {
    display: 'flex',
    columnGap: '8px',
  } as SxProps,
} as const
