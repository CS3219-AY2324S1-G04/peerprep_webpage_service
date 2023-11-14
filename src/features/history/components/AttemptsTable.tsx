import { Box, Button } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import moment from 'moment'
import { useMemo, useState } from 'react'

import { CommonTable as Table } from '../../../components/Table/Table'
import { useAppSelector } from '../../../hooks/useAppSelector'
import sortByDate from '../../../utils/sortByDate'
import { SortDirection } from '../../../utils/types'
import { getLanguages, getQuestionsMap } from '../../questionBank/selectors'
import { getAllUserAttempts } from '../selectors'
import { AttemptRow } from '../types'
import AttemptDetailsModal from './AttemptDetailsModal'

const DATE_COLUMN_KEY = 'date'
const ATTEMPT_ID_COLUMN_KEY = 'attemptId'
const QUESTION_TITLE_COLUMN_KEY = 'questionTitle'
const LANGUAGE_COLUMN_KEY = 'language'

const AttemptsTable: React.FC = () => {
  const attemptsList = useAppSelector(getAllUserAttempts)
  const questionsMap = useAppSelector(getQuestionsMap)
  const allLanguages = useAppSelector(getLanguages)

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)
  const [attemptToView, setAttemptToView] = useState<AttemptRow | undefined>(
    undefined,
  )

  const attemptRows: AttemptRow[] = useMemo(() => {
    const processed: AttemptRow[] = []

    attemptsList.forEach((a) => {
      const question = questionsMap[a.questionId]
      const languageIndex = allLanguages.findIndex(
        (l) => l.langSlug === a.language,
      )
      const language =
        languageIndex > -1
          ? allLanguages[languageIndex].language
          : 'Language not found'

      const toAdd: AttemptRow = {
        date: moment(a.date).format('LLLL'),
        attemptId: a.attemptId,
        questionTitle: question?.title ?? 'Question not found',
        language,
        attempt: a,
        question,
      }
      processed.push(toAdd)
    })

    return processed
  }, [attemptsList, questionsMap, allLanguages])

  const { items, sorting, paging, filtering } = Table.useTable<AttemptRow>(
    attemptRows,
    {
      sortKey: DATE_COLUMN_KEY,
      sortDir: SortDirection.Descending,
      searchFilterKeys: [
        DATE_COLUMN_KEY,
        ATTEMPT_ID_COLUMN_KEY,
        QUESTION_TITLE_COLUMN_KEY,
        LANGUAGE_COLUMN_KEY,
      ],
      columnFilterKeys: [],
      pageSize: 10,
      sortFunctions: {
        [DATE_COLUMN_KEY]: sortByDate,
      },
    },
  )

  return (
    <div>
      <Box sx={styles.subheaderRow}>
        <Table.Search
          value={filtering.filterText}
          onChange={filtering.setFilterText}
        />
      </Box>
      <Table>
        <Table.Header {...sorting}>
          <Table.ColumnHead
            id={DATE_COLUMN_KEY}
            cellProps={{ style: styles.widerColumnHead }}
          >
            Date
          </Table.ColumnHead>
          <Table.ColumnHead id={ATTEMPT_ID_COLUMN_KEY}>
            Attempt ID
          </Table.ColumnHead>
          <Table.ColumnHead id={QUESTION_TITLE_COLUMN_KEY}>
            Question Title
          </Table.ColumnHead>
          <Table.ColumnHead id={LANGUAGE_COLUMN_KEY}>Language</Table.ColumnHead>
          <Table.ColumnHead sortable={false} id="viewDetails" />
        </Table.Header>
        <Table.Body>
          {items.length > 0 &&
            items.map((row: AttemptRow) => (
              <Table.Row key={row.attemptId}>
                <Table.Cell>{row.date}</Table.Cell>
                <Table.Cell>{row.attemptId}</Table.Cell>
                <Table.Cell>{row.questionTitle}</Table.Cell>
                <Table.Cell>{row.language}</Table.Cell>
                <Table.Cell>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setAttemptToView(row)
                      setIsDetailsModalOpen(true)
                    }}
                  >
                    View Details
                  </Button>
                </Table.Cell>
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
      <AttemptDetailsModal
        attemptRow={attemptToView}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setAttemptToView(undefined)
        }}
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
    width: '25%',
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

export default AttemptsTable
