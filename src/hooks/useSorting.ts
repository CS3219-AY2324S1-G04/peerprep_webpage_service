import { orderBy } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'

import { SortDirection, SortFunction } from '../utils/types'

const getStringValueForSort = <T>(item: T, property: string) => {
  const stringValue: string = (item[property as keyof T] as string) || ''
  return stringValue.toLowerCase()
}

const sortByString = <T>(
  items: T[],
  sortKey: string,
  sortDir: SortDirection,
) => {
  return orderBy(
    items,
    [(item: T) => getStringValueForSort(item, sortKey)],
    [sortDir],
  )
}

const getSortFunction = <T>(
  sortFunctions: Record<string, SortFunction<T>>,
  key: string,
): SortFunction<T> => {
  return sortFunctions[key] || sortByString
  // Default to the original sorting function if no custom function is provided
}

export const useSortedItems = <T>(
  items: T[],
  initial: {
    sortKey: string
    sortDir: SortDirection
  } = { sortKey: '', sortDir: SortDirection.Ascending },
  sortFunctions: Record<string, SortFunction<T>> = {},
) => {
  const sortItemsRef = useRef(sortFunctions)

  useEffect(() => {
    sortItemsRef.current = sortFunctions
  }, [sortFunctions])

  const [sort, setSort] = useState({
    sortDir: initial.sortDir,
    sortKey: initial.sortKey,
  })

  const onSort = (newSortKey: string) => {
    const isAsc =
      sort.sortKey === newSortKey && sort.sortDir === SortDirection.Ascending
    setSort({
      sortKey: newSortKey,
      sortDir: isAsc ? SortDirection.Descending : SortDirection.Ascending,
    })
  }

  const sortFunction = getSortFunction<T>(sortItemsRef.current, sort.sortKey)

  const sortedItems = useMemo(
    () => sortFunction(items, sort.sortKey, sort.sortDir),
    [items, sort, sortFunction],
  )

  return {
    sortedItems,
    onSort,
    ...sort,
  }
}
