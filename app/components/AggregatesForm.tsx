import React from 'react'
import { type SubmitHandler } from 'react-hook-form'

import { type Query } from '@/page'
import { format } from 'date-fns'
import { z } from 'zod'

import DateRangePicker from './Form/DateRangePicker'
import Form from './Form/Form'
import InputField from './Form/InputField'

import styles from './AggregatesForm.module.css'

const formSchema = z.object({
  ticker: z.string().min(1, { message: '*Ticker name is required' }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

export type FormValues = z.infer<typeof formSchema>

type MyFormProps = {
  setQuery: React.Dispatch<React.SetStateAction<Query>>
}

export default function MyForm({ setQuery }: MyFormProps) {
  const onSubmit: SubmitHandler<FormValues> = (form) => {
    const query: Query = {
      ticker: form.ticker.toUpperCase(),
      from: format(form.dateRange.from, 'yyyy-MM-dd'),
      to: format(form.dateRange.to, 'yyyy-MM-dd'),
    }

    setQuery(query)
  }

  return (
    <div className={styles['form-wrapper']}>
      <Form<FormValues, typeof formSchema>
        onSubmit={onSubmit}
        schema={formSchema}
      >
        {({ register, formState: { errors }, control }) => (
          <>
            <InputField
              type="text"
              label="Enter Ticker:"
              error={errors.ticker}
              registration={register('ticker')}
              placeholder="e.g. AAPL"
              className={styles['form__text-input']}
            />

            <DateRangePicker<FormValues>
              label="Pick a date range:"
              control={control}
              name="dateRange"
              error={errors.dateRange?.from || errors.dateRange?.to}
            />

            <button className={styles['form__submit-btn']} type="submit">
              Search
            </button>
          </>
        )}
      </Form>
    </div>
  )
}
