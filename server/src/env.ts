import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().trim().startsWith('postgres://'),
  CLIENT_URL: z.string().trim(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  const errors = _env.error.format()
  console.error(errors)
  throw new Error('Invalid environment variables')
}

export const env = _env.data
