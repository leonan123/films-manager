import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'

import { auth } from './lib/auth'

const app = fastify({ logger: true })

app.register(fastifyCors, {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400,
})

app.get('/hello', () => {
  return 'Hello World'
})

app.route({
  method: ['GET', 'POST'],
  url: '/api/auth/*',
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

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
