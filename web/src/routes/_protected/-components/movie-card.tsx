import { DotOutlineIcon, StarIcon } from '@phosphor-icons/react'

import type { MyMoviesResponse } from '@/http/types/my-movies'

interface MovieCardProps {
  movie: MyMoviesResponse['movies'][0]
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="border-background relative flex aspect-7/10 flex-col justify-between overflow-hidden rounded-2xl border bg-[linear-gradient(180deg,rgba(9,9,16,0)_0%,rgba(9,9,16,0.9)_72.94%)] p-5">
      <img
        src={movie.thumbnail_url}
        alt="filme teste"
        className="absolute inset-0 -z-10 size-full object-cover"
      />

      <div className="-mt-3 -mr-3 ml-auto flex w-fit items-center gap-1.5 rounded-full bg-black/80 p-2">
        <div className="font-title flex items-baseline gap-1">
          <strong className="text-xl font-bold">4,5</strong>
          <span className="text-xs font-medium">/</span>
          <span className="text-xs font-medium">5</span>
        </div>

        <StarIcon size={16} weight="fill" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-title text-xl font-bold">{movie.title}</h3>
        <div className="text-muted flex items-center gap-1 text-sm">
          <span className="font-bold">{movie.category}</span>
          <DotOutlineIcon size={20} weight="fill" />
          <span>{movie.year}</span>
        </div>
      </div>
    </div>
  )
}
