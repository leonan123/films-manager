import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

import { myMovies } from '@/functions/my-movies'

export const myMoviesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/my-movies',
    {
      preHandler: [app.authenticate],
      schema: {
        tags: ['movies'],
        description: 'List movies of logged user',
        querystring: z.object({
          q: z
            .string()
            .trim()
            .min(3, { message: 'Mínimo de 3 caracteres' })
            .optional(),
        }),
        response: {
          200: z.object({
            movies: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                category: z.string(),
                year: z.number(),
                thumbnail_url: z.url().nullable(),
              }),
            ),
          }),
        },
      },
    },
    async (req, reply) => {
      const { q } = req.query
      const userId = req.user.id

      const movies = await myMovies(userId, q)

      reply.status(200).send({
        movies,
      })
    },
  )
}
