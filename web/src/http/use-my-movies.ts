import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/ky'

import type { MyMoviesResponse } from './types/my-movies'

export function useMyMovies() {
  return useQuery({
    queryKey: ['my-movies'],
    queryFn: async () => {
      const { movies } = await api
        .get<MyMoviesResponse>('movies/my-movies')
        .json()

      return {
        movies,
      }
    },
  })
}
