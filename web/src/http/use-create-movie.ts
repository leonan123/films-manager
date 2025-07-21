import { type AnyUseMutationOptions, useMutation } from '@tanstack/react-query'

import { api } from '@/lib/ky'

import type { CreateMovieRequest } from './types/create-movie'

export function useCreateMovie(opts?: AnyUseMutationOptions) {
  return useMutation({
    mutationFn: async (data: CreateMovieRequest) => {
      const formData = new FormData()

      formData.append('title', data.title)
      formData.append('category', data.category)
      formData.append('year', String(data.year))
      formData.append('description', data.description)

      if (data.image) {
        formData.append('image', data.image)
      }

      await api.post('movies/new', { body: formData })
    },
    ...opts,
  })
}
