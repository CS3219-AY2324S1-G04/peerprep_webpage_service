import { orderBy } from 'lodash'

import { Question } from '../features/questionBank/types'
import { SortDirection } from './types'

const sortByLanguageCount = (
  items: Question[],
  _sortKey: string,
  sortDir: SortDirection,
) => {
  return orderBy(items, [(item: Question) => item.template.length], [sortDir])
}

export default sortByLanguageCount
