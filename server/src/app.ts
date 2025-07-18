import fastifyCors, { type FastifyCorsOptions } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import { fromNodeHeaders } from 'better-auth/node'
import { fastify, type FastifyReply, type FastifyRequest } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { authClient } from './../../web/src/lib/auth'
import { errorHandler } from './error-handler'
import { routes } from './routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

const corsOpt: FastifyCorsOptions = {
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400,
}

app.decorate(
  'authenticate',
  async (req: FastifyRequest, reply: FastifyReply) => {
    const session = await authClient.getSession({
      fetchOptions: {
        headers: fromNodeHeaders(req.headers),
        credentials: 'include',
      },
    })

    if (!session.data?.user) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }

    app.decorateRequest('session', session.data.session)
    app.decorateRequest('user', session.data.user)
  },
)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifyCors, corsOpt)

app.register(fastifyMultipart, {
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
    files: 1,
  },
})

app.register(routes, { prefix: 'api/v1' })
