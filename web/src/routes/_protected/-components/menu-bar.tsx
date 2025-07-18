import { FilmSlateIcon, PopcornIcon, SignOutIcon } from '@phosphor-icons/react'
import { Link, useChildMatches } from '@tanstack/react-router'

import Logo from '/logo.svg'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { authClient } from '@/lib/auth'
import { extractInitialsFromName } from '@/utils/extract-initials-from-name'

export function MenuBar() {
  const session = authClient.useSession()
  const [childMatch] = useChildMatches()

  return (
    <div className="border-border flex items-center justify-between border-b px-6 py-4">
      <img src={Logo} alt="ab filmes" className="size-[48px]" />

      <nav className="flex items-center gap-6">
        <Link
          to="/explore"
          data-active={childMatch.fullPath.endsWith('/explore/')}
          className="text-muted data-[active=true]:bg-accent data-[active=true]:text-accent-foreground flex h-10 items-center justify-center rounded-xl bg-transparent px-3"
        >
          <PopcornIcon size={20} className="mr-2" />
          Explore
        </Link>

        <Link
          to="/my-movies"
          data-active={childMatch.fullPath.endsWith('/my-movies/')}
          className="text-muted data-[active=true]:bg-accent data-[active=true]:text-accent-foreground flex h-10 items-center justify-center rounded-xl bg-transparent px-3"
        >
          <FilmSlateIcon size={20} className="mr-2" />
          Meus filmes
        </Link>
      </nav>

      <div className="flex h-full items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-sm">
            Olá, {session.data?.user.name}
          </span>

          <Avatar className="size-8 rounded-lg border">
            <AvatarFallback className="rounded-lg">
              {extractInitialsFromName(session.data?.user.name || '')}
            </AvatarFallback>
          </Avatar>
        </div>

        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-8"
        />

        <Button variant="secondary" size="icon">
          <span className="sr-only">Sair</span>
          <SignOutIcon size={20} />
        </Button>
      </div>
    </div>
  )
}
