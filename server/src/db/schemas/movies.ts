import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { users } from './users'

export const movies = pgTable('movies', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  category: text('category').notNull(),
  year: integer('year').notNull(),
  description: text('description'),
  thumbnail_url: text('thumbnail_url'),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => new Date()),
})
