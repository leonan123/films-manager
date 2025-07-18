import type { FastifyPluginAsync } from 'fastify'

import { auth } from '@/lib/auth'

export const authRoutes: FastifyPluginAsync = async (app) => {
  app.route({
    method: ['GET', 'POST'],
    url: '/auth/*',
    async handler(request, reply) {
      try {
        const url = new URL(request.url, `http://${request.headers.host}`)
        const headers = new Headers()

        Object.entries(request.headers).forEach(([key, value]) => {
          if (value) headers.append(key, value.toString())
        })

        const req = new Request(url.toString(), {
          method: request.method,
          headers,
          body: request.body ? JSON.stringify(request.body) : undefined,
        })

        const response = await auth.handler(req)
        response.headers.forEach((value, key) => reply.header(key, value))

        reply.status(response.status)
        reply.send(response.body ? await response.text() : null)
      } catch (error) {
        app.log.error('Authentication Error:', error)

        reply.status(500).send({
          error: 'Internal authentication error',
          code: 'AUTH_FAILURE',
        })
      }
    },
  })
}
