import React from 'react'
import {
  useForm,
  FormProvider,
  type SubmitHandler,
  type FieldValues,
  type UseFormProps,
} from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType, ZodTypeDef } from 'zod'

export type FormProps<TFormValues extends FieldValues, Schema> = {
  children: React.ReactNode
  onSubmit: SubmitHandler<TFormValues>
  schema?: Schema
  options?: UseFormProps<TFormValues>
}

export default function Form<
  TFormValues extends FieldValues = FieldValues,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>(props: FormProps<TFormValues, Schema>) {
  const { children, schema, options, onSubmit } = props

  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
