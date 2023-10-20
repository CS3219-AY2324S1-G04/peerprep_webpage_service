import { orderBy } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'

import { SortDirection } from '../utils/types'

const getStringValueForSort = <T>(item: T, property: string) => {
  const stringValue: string = item[property as keyof T] as string
  return (stringValue || '').toLowerCase()
}

const sortByString = <T>(
  items: T[],
  sortKey: string,
  sortDir: SortDirection,
) => {
  return orderBy(
    items,
    [(item: string) => getStringValueForSort(item, sortKey)],
    [sortDir],
  )
}

export const useSortedItems = <T>(
  items: T[],
  initial = {},
  sortItems = sortByString,
) => {
  // We don't want to re-render if the sort fn changes
  // because most likely it changed "accidentally" by
  // consumer re-creating the same function definition
  const sortItemsRef = useRef(sortItems)

  useEffect(() => {
    sortItemsRef.current = sortItems
  }, [sortItems])

  const [sort, setSort] = useState({
    sortDir: SortDirection.Ascending,
    sortKey: '',
    ...initial,
  })

  const onSort = (newSortKey: string) => {
    const isAsc = sort.sortKey === newSortKey && sort.sortDir === 'asc'
    setSort({
      sortKey: newSortKey,
      sortDir: isAsc ? SortDirection.Descending : SortDirection.Ascending,
    })
  }
  const sortedItems = useMemo(
    () => sortItemsRef.current(items, sort.sortKey, sort.sortDir),
    [items, sort],
  )

  return {
    sortedItems,
    onSort,
    ...sort,
  }
}
