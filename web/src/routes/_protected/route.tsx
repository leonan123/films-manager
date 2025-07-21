import { createFileRoute, Outlet } from '@tanstack/react-router'

import { MenuBar } from './-components/menu-bar'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <MenuBar />

      <div className="mx-auto mt-16 max-w-[1366px] px-4">
        <Outlet />
      </div>
    </div>
  )
}
