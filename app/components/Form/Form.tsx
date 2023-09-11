import React from 'react'
import { ZodType, ZodTypeDef } from 'zod'
import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export type FormProps<TFormValues extends FieldValues, Schema> = {
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
  onSubmit: SubmitHandler<TFormValues>
  schema?: Schema
  options?: UseFormProps<TFormValues>
}

export default function Form<
  TFormValues extends FieldValues,
  Schema extends ZodType<unknown, ZodTypeDef, unknown>
>(props: FormProps<TFormValues, Schema>) {
  const { children, schema, options, onSubmit } = props

  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  })

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  )
}
