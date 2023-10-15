import { useState, useMemo, useEffect } from "react"

const normalizePage = (newPage: number, totalPages: number, enableWrapping = false) => {
  if (newPage < 1) {
    return enableWrapping ? totalPages : 1
  } else if (newPage > totalPages) {
    return enableWrapping ? 1 : totalPages
  }
  return newPage
}

export function usePaging(
  itemCount: number,
  pageSize: number,
  { initialPage = 1, enableWrapping = false } = {}
) {
  let [currentPage, setCurrentPage] = useState(initialPage)

  let totalPages = Math.ceil(itemCount / pageSize)
  let actions = useMemo(() => {
    return {
      goBack: () => {
        setCurrentPage((current) => {
          return normalizePage(current - 1, totalPages, enableWrapping)
        })
      },
      goForward: () => {
        setCurrentPage((current) => {
          return normalizePage(current + 1, totalPages, enableWrapping)
        })
      },
      goTo: (targetPage: number) => {
        setCurrentPage(normalizePage(targetPage, totalPages, enableWrapping))
      }
    }
  }, [setCurrentPage, totalPages, enableWrapping])

  useEffect(() => {
    setCurrentPage((current) =>
      normalizePage(current, totalPages, enableWrapping)
    )
  }, [totalPages, enableWrapping])

  return {
    currentPage,
    totalPages,
    ...actions
  }
}

export const usePagedItems = function (
  allItems: any[],
  pageSize = 10,
  { initialPage = 1, enableWrapping = false } = {}
) {
  const paging = usePaging(allItems.length, pageSize, { initialPage })
  const startIndex =
    allItems.length <= pageSize ? 0 : paging.currentPage * pageSize - pageSize
  let endIndex = startIndex + pageSize
  let isWrapping = endIndex > allItems.length

  let items = allItems.slice(startIndex, endIndex)
  if (enableWrapping && isWrapping) {
    items = [...items, ...allItems.slice(0, endIndex - allItems.length)]
  }

  return {items, paging}
}
