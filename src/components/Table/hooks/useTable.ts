import { useFilteredItems } from "../../../hooks/useFilteredItems"
import { usePagedItems } from "../../../hooks/usePagination"
import { useSortedItems } from "../../../hooks/useSorting"
import { SortDirection } from "../../../utils/types"

export function useTable<T>(
  allItems: T[],
  { searchFilterKeys = [], columnFilterKeys = [], sortKey, sortDir, pageSize }: { searchFilterKeys: string[], columnFilterKeys: string[], sortKey: string, sortDir: SortDirection, pageSize: number }
) {
  pageSize = pageSize || allItems.length
  const { filteredItems, ...filtering } = useFilteredItems(
    allItems,
    searchFilterKeys,
    columnFilterKeys
  )
  const { sortedItems, ...sorting } = useSortedItems(filteredItems, {
    sortKey,
    sortDir
  })

  const { items, paging } = usePagedItems(sortedItems, pageSize)

  const stats = {
    totalItems: allItems.length,
    start: (paging.currentPage - 1) * pageSize + 1,
    end: Math.min(paging.currentPage * pageSize, allItems.length)
  }

  return {
    items,
    filtering,
    sorting,
    paging,
    stats
  }
}
