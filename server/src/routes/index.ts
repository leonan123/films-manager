import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { authRoutes } from './auth'
import { myMoviesRoute } from './movies/my-movies'
import { newMovieRoute } from './movies/new-movie'

export const routes: FastifyPluginAsyncZod = async (app) => {
  app.register(newMovieRoute, { prefix: '/movies' })
  app.register(myMoviesRoute, { prefix: '/movies' })
  app.register(authRoutes)
}
