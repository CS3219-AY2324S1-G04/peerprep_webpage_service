import { Box, Typography } from '@mui/joy'

import first from '../../../assets/first.png'
import second from '../../../assets/second.png'
import third from '../../../assets/third.png'
import { CommonTable as Table } from '../../../components/Table/Table'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { SortDirection } from '../../../utils/types'
import { getRankings } from '../selectors'
import { Ranking } from '../types'

const RANK_COLUMN_KEY = 'rank'
const USERNAME_COLUMN_KEY = 'username'
const ATTEMPTS_COUNT_COLUMN_KEY = 'attemptsCount'

const RankingsTable: React.FC = () => {
  const rankings = useAppSelector(getRankings)

  const { items, sorting, paging } = Table.useTable<Ranking>(rankings, {
    sortKey: '',
    sortDir: SortDirection.Descending,
    searchFilterKeys: [],
    columnFilterKeys: [],
    pageSize: 10,
  })

  const getMedalSrc = (rank: number) => {
    if (rank == 1) return first
    if (rank == 2) return second
    if (rank == 3) return third
  }

  return (
    <div>
      <Table>
        <Table.Header {...sorting}>
          <Table.ColumnHead id={RANK_COLUMN_KEY}>Rank</Table.ColumnHead>
          <Table.ColumnHead
            id={USERNAME_COLUMN_KEY}
            cellProps={{ style: styles.widerColumnHead }}
          >
            Username
          </Table.ColumnHead>
          <Table.ColumnHead id={ATTEMPTS_COUNT_COLUMN_KEY}>
            Attempts
          </Table.ColumnHead>
        </Table.Header>
        <Table.Body>
          {items.length > 0 &&
            items.map((row: Ranking) => {
              const isTopThree =
                row.rank === 1 || row.rank === 2 || row.rank === 3
              return (
                <Table.Row key={row.rank}>
                  <Table.Cell>
                    <Box display="flex" alignItems="center">
                      {isTopThree && (
                        <img
                          src={getMedalSrc(row.rank)}
                          style={{ maxWidth: '18px' }}
                        />
                      )}
                      &nbsp;
                      {row.rank}
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Typography
                      fontWeight={isTopThree ? 'bold' : ''}
                      fontStyle={isTopThree ? 'italic' : ''}
                    >
                      {row.username}
                    </Typography>
                  </Table.Cell>
                  <Table.Cell>{row.attemptsCount}</Table.Cell>
                </Table.Row>
              )
            })}
        </Table.Body>
      </Table>
      <Table.Pagination
        currentPage={paging.currentPage}
        lastPage={paging.totalPages}
        onPageChange={paging.goTo}
        maxLength={7}
      />
    </div>
  )
}

const styles = {
  widerColumnHead: {
    width: '50%',
  },
} as const

export default RankingsTable
