type Movie = {
  id: string
  title: string
  category: string
  year: number
  thumbnail_url?: string
}

export interface MyMoviesResponse {
  movies: Movie[]
}
