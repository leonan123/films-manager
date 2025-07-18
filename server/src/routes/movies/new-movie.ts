import type { MultipartFile } from '@fastify/multipart'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z, ZodError } from 'zod/v4'

import { newMovie } from '@/functions/new-movie'

const newMovieSchema = z.object({
  title: z.string().trim().min(3, { message: 'Mínimo de 3 caracteres' }),
  category: z.string().trim().min(1, { message: 'Selecione uma categoria' }),
  year: z.coerce.number().min(3, { message: 'Mínimo de 3 caracteres' }),
  description: z.string().trim().min(3, { message: 'Mínimo de 3 caracteres' }),
})

export const newMovieRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/new',
    {
      preHandler: [app.authenticate],
      schema: {
        tags: ['movies'],
        description: 'Create a new movie',
        consumes: ['multipart/form-data'],
        response: {
          201: z.null(),
          400: z.object({
            message: z.string(),
            issues: z.array(z.object({ message: z.string() })),
          }),
        },
      },
    },
    async (req, reply) => {
      const parsedBodyParts: Record<string, unknown> = {}

      let image: MultipartFile | undefined

      for await (const part of req.parts()) {
        if (part.type === 'file') {
          image = part
        } else {
          parsedBodyParts[part.fieldname] = part.value
        }
      }

      const movieData = newMovieSchema.safeParse(parsedBodyParts)

      if (!movieData.success) {
        throw new ZodError(movieData.error.issues)
      }

      const { title, category, year, description } = movieData.data

      await newMovie({
        userId: req.user.id,
        title,
        category,
        year,
        description,
        image,
      })

      reply.status(201).send()
    },
  )
}
