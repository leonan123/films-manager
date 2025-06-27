import { createFileRoute } from '@tanstack/react-router'

import { SearchFilmsForm } from '../-components/search-films-form'

export const Route = createFileRoute('/_protected/explore/')({
  component: ExploreFilmsPage,
})

function ExploreFilmsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Explorar</h1>

        <div className="flex items-center gap-4">
          <SearchFilmsForm />
        </div>
      </div>
    </div>
  )
}
