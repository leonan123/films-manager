import {
  createFileRoute,
  Link,
  Outlet,
  useChildMatches,
} from '@tanstack/react-router'

import LoginImage from '/login-image.png'
import Logo from '/logo.svg'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const [childMatch] = useChildMatches()

  return (
    <div className="mx-auto grid h-dvh max-w-[1366px] grid-cols-1 items-center justify-center gap-40 p-4 lg:grid-cols-[2fr_1fr] lg:p-9">
      <div className="relative hidden size-full overflow-hidden rounded-4xl p-8 lg:block">
        <img
          src={LoginImage}
          className="absolute inset-0 -z-10 size-full object-cover"
        />

        <div className="flex h-full flex-col items-start justify-between">
          <img src={Logo} alt="ab filmes" className="h-[64px] w-[54]" />

          <div className="space-y-3">
            <h2 className="font-display text-muted">Ab Filmes</h2>
            <p className="font-display text-xl">
              O guia definitivo para os <br /> amantes do cinema
            </p>
          </div>
        </div>
      </div>

      <div className="flex size-full flex-col items-center justify-center lg:justify-start">
        <div className="mx-auto w-full max-w-[328px] space-y-12 lg:mt-52">
          <div className="bg-secondary grid w-full grid-cols-2 items-center gap-1 rounded-xl p-1">
            <Link
              to="/sign-in"
              data-active={childMatch.fullPath === '/sign-in'}
              className="text-muted data-[active=true]:bg-accent data-[active=true]:text-accent-foreground flex h-10 items-center justify-center rounded-xl bg-transparent"
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              data-active={childMatch.fullPath === '/sign-up'}
              className="text-muted data-[active=true]:bg-accent data-[active=true]:text-accent-foreground flex h-10 items-center justify-center rounded-xl bg-transparent"
            >
              Cadastro
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  )
}
