import type { Session, User } from 'better-auth'
import type { FastifyReply } from 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    session: Session
    user: User
  }

  export interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}
