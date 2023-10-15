import { useState, useMemo } from "react"
import { matchSorter } from "match-sorter"
import { useDebouncedValue } from "./useDebounce"

export function useFilteredItems(allItems: any, searchProperties: string[], columnProperties: string[]) {
  const [filterText, setFilterText] = useState<string>("") // to filter by search term
  const [filterColumns, setFilterColumns] = useState<Map<string, string[]>>(new Map([])) // to filter by column values

  const debouncedFilterText = useDebouncedValue(filterText, 250)
  const propertiesKey = (searchProperties || []).join(",")
  const filteredItems = useMemo(() => {
    let filtered: string[] = allItems
    if (allItems && allItems.length) {
      if (!searchProperties.length && !columnProperties.length) {
        return allItems
      }

      if (searchProperties.length > 0) {
        filtered = matchSorter(allItems, debouncedFilterText, {
          keys: searchProperties,
          threshold: matchSorter.rankings.CONTAINS
        })
      }

      if (columnProperties.length > 0) {
        columnProperties.forEach((property) => {
          const terms = filterColumns.get(property) ?? []

          filtered = terms.reduceRight((results, term) => matchSorter(results, term, { 
            keys: [property],
            threshold: matchSorter.rankings.EQUAL
          }), filtered)
        })
      }

      return filtered
    }

    return []
  }, [allItems, debouncedFilterText, propertiesKey, filterColumns])

  return {
    filterText,
    setFilterText,
    filterColumns,
    setFilterColumns,
    filteredItems
  }
}
