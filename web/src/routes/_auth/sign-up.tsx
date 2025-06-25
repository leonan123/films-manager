import { zodResolver } from '@hookform/resolvers/zod'
import { EnvelopeIcon, PasswordIcon, UserIcon } from '@phosphor-icons/react'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { InputWithIcon } from '@/components/ui/input'
import { seo } from '@/utils/seo'

export const Route = createFileRoute('/_auth/sign-up')({
  component: RouteComponent,
  head: () => ({
    meta: [...seo({ title: 'Criar conta' })],
  }),
})

const signUpSchema = z.object({
  name: z.string().trim().min(3, { message: 'Mínimo de 3 caracteres' }),
  email: z.string({ required_error: 'E-mail obrigatório' }).email({
    message: 'E-mail inválido',
  }),
  password: z.string().trim().min(6, { message: 'Mínimo de 6 caracteres' }),
})

type signUpData = z.infer<typeof signUpSchema>

function RouteComponent() {
  const form = useForm<signUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(values: signUpData) {
    console.log(values)
  }

  return (
    <div>
      <h1 className="font-display mb-5 text-2xl">Criar conta</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Nome</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      icon={UserIcon}
                      placeholder="Nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">E-mail</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      type="email"
                      icon={EnvelopeIcon}
                      placeholder="E-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Senha</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      icon={PasswordIcon}
                      type="password"
                      placeholder="Senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Criar conta
          </Button>
        </form>
      </Form>
    </div>
  )
}
