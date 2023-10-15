import { useState, useMemo, useEffect, useRef } from "react"
import { orderBy } from "lodash"
import { SortDirection } from "../utils/types"

const getStringValueForSort = (item: any, property: any) =>
  (item[property] || "").toLowerCase()

const sortByString = (items: any[], sortKey: string, sortDir: SortDirection) => {
  return orderBy(
    items,
    [(item: any) => getStringValueForSort(item, sortKey)],
    [sortDir]
  )
}

export const useSortedItems = (
  items: any[],
  initial = {},
  sortItems = sortByString
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
    sortKey: "",
    ...initial
  })

  const onSort = (newSortKey: string) => {
    const isAsc = sort.sortKey === newSortKey && sort.sortDir === "asc"
    setSort({
      sortKey: newSortKey,
      sortDir: isAsc ? SortDirection.Descending : SortDirection.Ascending
    })
  }
  // Sort case-insensitive by whatever column is selected, use userId to break sorting ties
  const sortedItems = useMemo(
    () => sortItemsRef.current(items, sort.sortKey, sort.sortDir),
    [items, sort]
  )

  return {
    sortedItems,
    onSort,
    ...sort
  }
}
