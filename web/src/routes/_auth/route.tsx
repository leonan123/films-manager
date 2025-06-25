import { createFileRoute, Outlet } from '@tanstack/react-router'

import { Button } from '../../components/ui/button'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Button>teste</Button>
      <h1>/_auth</h1>
      <Outlet />
    </div>
  )
}
