import { orderBy } from 'lodash'

import { Question, QuestionComplexity } from '../features/questionBank/types'
import { SortDirection } from './types'

const complexityOrder = {
  [QuestionComplexity.Easy]: 1,
  [QuestionComplexity.Medium]: 2,
  [QuestionComplexity.Hard]: 3,
}

const sortByComplexity = (
  items: Question[],
  _sortKey: string,
  sortDir: SortDirection,
) => {
  return orderBy(
    items,
    [(item: Question) => complexityOrder[item.complexity]],
    [sortDir],
  )
}

export default sortByComplexity
