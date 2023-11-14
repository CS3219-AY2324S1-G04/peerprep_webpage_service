import { orderBy } from 'lodash'
import moment from 'moment'

import { AttemptRow } from '../features/history/types'
import { SortDirection } from './types'

const sortByDate = (
  items: AttemptRow[],
  _sortKey: string,
  sortDir: SortDirection,
) => {
  return orderBy(
    items,
    [
      (item: AttemptRow) => {
        const dateString = moment(item.date, 'LLLL').format()
        const date = new Date(dateString)
        return date
      },
    ],
    [sortDir],
  )
}

export default sortByDate
