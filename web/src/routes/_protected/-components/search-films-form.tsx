import { MagnifyingGlassIcon } from '@phosphor-icons/react'

import { InputWithIcon } from '@/components/ui/input'

export function SearchFilmsForm() {
  return (
    <form
      action=""
      onSubmit={(e) => e.preventDefault()}
      className="max-w-[264px] flex-1"
    >
      <InputWithIcon
        icon={MagnifyingGlassIcon}
        role="searchbox"
        placeholder="Procurar filmes"
      />
    </form>
  )
}
