import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-border flex h-12 w-full min-w-0 rounded-md border bg-transparent px-4 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'group-has-[.icon]:pl-12',
        className,
      )}
      {...props}
    />
  )
}

interface InputIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  icon: React.ElementType
  className?: string
}

function InputIcon({ icon: Icon, className, ...props }: InputIconProps) {
  return (
    <Icon
      size={20}
      className={cn(
        'icon text-muted-foreground group-focus-within:text-primary group-has-aria-invalid:text-destructive group-has-[input:not(:placeholder-shown)[aria-invalid=false]]:text-primary absolute top-1/2 left-4 -translate-y-1/2',
        className,
      )}
      {...props}
    />
  )
}

function InputWithIcon<Props extends React.ComponentPropsWithoutRef<'input'>>({
  icon: Icon,
  ...props
}: InputIconProps & Props): React.JSX.Element {
  return (
    <div className="group relative">
      <InputIcon icon={Icon} />
      <Input {...props} />
    </div>
  )
}

export { Input, InputIcon, InputWithIcon }
