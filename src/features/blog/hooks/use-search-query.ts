// use-search-query.ts (alternative, no nuqs)
import { useSearch, useNavigate } from '@tanstack/react-router'

export function useSearchQuery() {
  const search = useSearch({ from: "/blog/" }) // Now properly typed!
  const navigate = useNavigate({ from: "/blog" })
  
  const query = search.q ?? ''
  
  const setQuery = (newQuery: string | null) => {
    navigate({
      search: (prev) => ({
        ...prev,
        q: newQuery ?? '',
      }),
      replace: true,
    })
  }

  return { query, setQuery }
}