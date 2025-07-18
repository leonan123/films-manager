import { basename, extname } from 'node:path'

import type { MultipartFile } from '@fastify/multipart'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { schema } from '@/db/schemas'
import { storageService } from '@/services/storage-service'
import { getRandomFileName } from '@/utils/get-random-file-name'

interface newMovieInput {
  userId: string
  title: string
  category: string
  description: string
  year: number
  image?: MultipartFile
}

export async function newMovie(data: newMovieInput) {
  const [movie] = await db
    .insert(schema.movies)
    .values({
      userId: data.userId,
      title: data.title,
      category: data.category,
      description: data.description,
      year: data.year,
    })
    .returning()

  if (data.image) {
    const extension = extname(data.image.filename)
    const filenameWithoutExtension = basename(data.image.filename, extension)
    const sanitizedFilename = filenameWithoutExtension.replace(
      /[^a-zA-Z0-9]/g,
      '',
    )
    const parsedFilename = `${getRandomFileName()}-${sanitizedFilename}${extension}`

    const fileStream = data.image.file

    const thumbnailUrl = await storageService.uploadFile({
      mimetype: data.image.mimetype,
      fileName: parsedFilename,
      folder: 'movies-thumbnails',
      entityId: movie.id,
      contentStream: fileStream,
    })

    await db
      .update(schema.movies)
      .set({ thumbnail_url: thumbnailUrl.url })
      .where(eq(schema.movies.id, movie.id))
  }
}
