import { PlusIcon } from '@phosphor-icons/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useMyMovies } from '@/http/use-my-movies'
import { seo } from '@/utils/seo'

import { MovieCard } from '../-components/movie-card'
import { SearchFilmsForm } from '../-components/search-films-form'

export const Route = createFileRoute('/_protected/my-movies/')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Meus filmes',
      }),
    ],
  }),
  component: MyFilmsPage,
})

function MyFilmsPage() {
  const { data } = useMyMovies()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Meus filmes</h1>

        <div className="flex items-center gap-4">
          <SearchFilmsForm />

          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-10"
          />

          <Button asChild>
            <Link to="/my-movies/new">
              <PlusIcon size={20} />
              Novo
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {data?.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
