import { zodResolver } from '@hookform/resolvers/zod'
import { EnvelopeIcon, PasswordIcon } from '@phosphor-icons/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
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
import { authClient } from '@/lib/auth'
import { seo } from '@/utils/seo'

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignInPage,
  head: () => ({
    meta: [...seo({ title: 'Login' })],
  }),
})

const signInSchema = z.object({
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string().trim().min(6, { message: 'Mínimo de 6 caracteres' }),
})

type signInData = z.infer<typeof signInSchema>

function SignInPage() {
  const navigate = useNavigate()
  const form = useForm<signInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: signInData) {
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    })

    if (error) {
      console.log(error)
      return
    }

    if (data?.user) {
      navigate({ to: '/explore' })
    }
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
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  )
}
