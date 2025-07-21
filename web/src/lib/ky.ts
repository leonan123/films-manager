import ky from 'ky'

export const api = ky.create({
  credentials: 'include',
  prefixUrl: 'http://localhost:3333/api/v1',
})
