import { and, desc, eq, ilike, or } from 'drizzle-orm'

import { db } from '@/db'
import { schema } from '@/db/schemas'

export async function myMovies(userId: string, q = '') {
  const movies = await db.query.movies.findMany({
    columns: {
      id: true,
      title: true,
      category: true,
      year: true,
      thumbnail_url: true,
    },
    where: and(
      eq(schema.movies.userId, userId),
      or(
        ilike(schema.movies.title, `%${q}%`),
        ilike(schema.movies.description, `%${q}%`),
      ),
    ),
    orderBy: desc(schema.movies.createdAt),
  })

  return movies
}
