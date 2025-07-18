import { Readable } from 'node:stream'

import type { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { z } from 'zod/v4'

import { env } from '@/env'
import { r2 } from '@/lib/r2'

const uploadFileOptionsSchema = z.object({
  contentStream: z.instanceof(Readable, { error: 'contentStream is required' }),
  fileName: z.string().min(1, 'fileName is required'),
  mimetype: z
    .string()
    .min(1, 'mimetype is required')
    .startsWith('image/', { error: 'Unsupported MIME type' }),
  folder: z.string().min(1, 'folder is required').optional(),
  entityId: z.string().min(1, 'entityId is required').optional(),
})

type UploadFileOptions = z.infer<typeof uploadFileOptionsSchema>

class StorageService {
  private client: S3Client
  private bucketName: string

  constructor() {
    this.client = r2
    this.bucketName = env.CLOUDFLARE_BUCKET_NAME
  }

  async uploadFile(data: UploadFileOptions) {
    const { folder, fileName, entityId, contentStream, mimetype } =
      uploadFileOptionsSchema.parse(data)

    const fullPath = `${folder}/${entityId}/${fileName}`

    const upload = new Upload({
      client: this.client,
      params: {
        Bucket: this.bucketName,
        Key: fullPath,
        Body: contentStream,
        ContentType: mimetype,
      },
    })

    await upload.done()

    return {
      url: new URL(fullPath, env.CLOUDFLARE_PUBLIC_URL).toString(),
    }
  }
}

export const storageService = new StorageService()
