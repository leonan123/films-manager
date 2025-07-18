import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'

import { MenuBar } from './-components/menu-bar'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
  beforeLoad: async () => {
    // const session = await authClient.getSession({
    //   fetchOptions: {
    //     credentials: 'include',
    //   },
    // })
    // if (!session.data?.user) {
    //   return redirect({
    //     to: '/sign-in',
    //   })
    // }
  },
})

function RouteComponent() {
  return (
    <div>
      <MenuBar />

      <div className="mx-auto mt-16 max-w-[1366px]">
        <Outlet />
      </div>
    </div>
  )
}
