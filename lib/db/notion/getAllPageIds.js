import BLOG from "@/blog.config"

/**
 * 从 collectionView 的 page_sort 中获取页面ID（兼容新版Notion API嵌套格式）
 * 新版Notion API的collectionView结构：{spaceId, value: {value: {page_sort:[...]}, role}}
 * 旧版Notion API的collectionView结构：{value: {page_sort:[...]}, role} 或 {page_sort:[...]}
 */
function getPageIdsFromCollectionView(collectionView, viewIds, groupIndex) {
  if (!collectionView || !viewIds || !viewIds.length) return []
  const viewId = viewIds[groupIndex] || viewIds[0]
  const viewEntry = collectionView[viewId]
  if (!viewEntry) return []
  // 兼容不同嵌套层级：新版 {spaceId, value:{value:{...}}} / 旧版 {value:{...}} / 直接 {...}
  const inner = viewEntry?.value?.value || viewEntry?.value || viewEntry
  const pageSort = inner?.page_sort
  if (Array.isArray(pageSort) && pageSort.length > 0) {
    return pageSort
  }
  return []
}

export default function getAllPageIds(collectionQuery, collectionId, collectionView, viewIds) {
  if (!collectionQuery && !collectionView) {
    return []
  }
  let pageIds = []
  try {
    // Notion数据库中的第几个视图用于站点展示和排序：
    const groupIndex = BLOG.NOTION_INDEX || 0
    if (viewIds && viewIds.length > 0) {
      const ids = collectionQuery[collectionId]?.[viewIds[groupIndex]]?.collection_group_results?.blockIds || []
      if (ids) {
        for (const id of ids) {
          pageIds.push(id)
        }
      }
    }
  } catch (error) {
    console.error('Error fetching page IDs:', error)
  }

  // 否则按照数据库原始排序
  if (pageIds.length === 0 && collectionQuery && Object.values(collectionQuery).length > 0) {
    const pageSet = new Set()
    const queryData = collectionQuery[collectionId]
    if (queryData) {
      Object.values(queryData).forEach(view => {
        view?.blockIds?.forEach(id => pageSet.add(id)) // group视图
        view?.collection_group_results?.blockIds?.forEach(id => pageSet.add(id)) // table视图
      })
    }
    pageIds = [...pageSet]
  }

  // 最终回退：当 collectionQuery 为空时（Notion API 新格式兼容），从 collectionView.page_sort 获取
  if (pageIds.length === 0 && collectionView) {
    const groupIndex = BLOG.NOTION_INDEX || 0
    const fallbackIds = getPageIdsFromCollectionView(collectionView, viewIds, groupIndex)
    if (fallbackIds.length > 0) {
      pageIds = fallbackIds
    } else {
      // 遍历所有视图，取第一个有 page_sort 的
      if (viewIds) {
        for (let i = 0; i < viewIds.length; i++) {
          const ids = getPageIdsFromCollectionView(collectionView, viewIds, i)
          if (ids.length > 0) {
            pageIds = ids
            break
          }
        }
      }
    }
  }

  return pageIds
}
