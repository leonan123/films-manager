import { zodResolver } from '@hookform/resolvers/zod'
import {
  CalendarBlankIcon,
  FilmSlateIcon,
  TagIcon,
} from '@phosphor-icons/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import InputFileDropzone from '@/components/input-file-dropzone'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerWithIcon,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { seo } from '@/utils/seo'

export const Route = createFileRoute('/_protected/my-films/new/')({
  head: () => ({
    meta: [...seo({ title: 'Novo filme' })],
  }),
  component: NewFilmPage,
})

const categoriesOptions = [
  { value: 'action', label: 'Ação' },
  { value: 'comedy', label: 'Comédia' },
  { value: 'drama', label: 'Drama' },
  { value: 'horror', label: 'Terror' },
  { value: 'romance', label: 'Romance' },
  { value: 'sci-fi', label: 'Ficção Científica' },
  { value: 'thriller', label: 'Suspense' },
  { value: 'documentary', label: 'Documentário' },
]

const newFilmFormSchema = z.object({
  title: z.string().trim().min(3, { message: 'Mínimo de 3 caracteres' }),
  categories: z.string().trim().min(1, { message: 'Selecione uma categoria' }),
  year: z.coerce
    .number({ required_error: 'Ano obrigatório' })
    .min(3, { message: 'Mínimo de 3 caracteres' }),
  description: z.string().trim().min(3, { message: 'Mínimo de 3 caracteres' }),
  image: z.instanceof(File),
})

type NewFilmFormData = z.infer<typeof newFilmFormSchema>

function NewFilmPage() {
  const form = useForm<NewFilmFormData>({
    resolver: zodResolver(newFilmFormSchema),
    defaultValues: {
      title: '',
      categories: '',
      year: 0,
      description: '',
      image: new File([], ''),
    },
  })

  async function onSubmit(values: NewFilmFormData) {
    console.log(values)
  }

  return (
    <div className="flex h-[490px] w-full items-center gap-12">
      <div className="flex size-full max-w-[381px] items-center justify-center">
        <InputFileDropzone />
      </div>

      <div className="size-full space-y-6">
        <h1 className="font-title text-xl font-bold">Novo filme</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            noValidate
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Título</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        icon={FilmSlateIcon}
                        placeholder="Título"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Ano</FormLabel>
                      <FormControl>
                        <InputWithIcon
                          type="number"
                          icon={CalendarBlankIcon}
                          placeholder="Ano"
                          className="appearance-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTriggerWithIcon
                            icon={TagIcon}
                            className="w-full"
                          >
                            <SelectValue placeholder="Categoria" />
                          </SelectTriggerWithIcon>
                        </FormControl>

                        <SelectContent>
                          {categoriesOptions.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descrição"
                        className="min-h-[200px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="ghost" type="button" asChild>
                <Link to="/my-films">Cancelar</Link>
              </Button>

              <Button type="submit" className="w-fil">
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
