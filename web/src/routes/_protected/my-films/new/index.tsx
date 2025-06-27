import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/my-films/new/')({
  component: NewFilmPage,
})

function NewFilmPage() {
  return <div>Hello "/_protected/my-films/new/"!</div>
}
