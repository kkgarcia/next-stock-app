import React, { useState } from 'react'
import { format } from 'date-fns'
import { useForm, SubmitHandler } from 'react-hook-form'
import { DateRangePicker, DateRangePickerValue } from '@tremor/react'
import styles from './Form.module.css'
import { Query } from './App'
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query'

type FormProps = {
  query: Query
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>
}

type FormInput = {
  ticker: string
}

export default function Form({ query, refetch }: FormProps) {
  const [dateValue, setDateValue] = useState<DateRangePickerValue>({
    from: new Date(),
    to: new Date(),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({ defaultValues: { ticker: '' } })

  const onSubmit: SubmitHandler<FormInput> = (form) => {
    if (!dateValue.from || !dateValue.to) return

    query.ticker = form.ticker.toUpperCase()
    query.from = format(dateValue.from as Date, 'yyyy-MM-dd')
    query.to = format(dateValue.to as Date, 'yyyy-MM-dd')
    refetch()
  }

  return (
    <div className={styles['form-wrapper']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['form__control']}>
          <label htmlFor="ticker">Enter Ticker:</label>
          <input
            type="text"
            id="ticker"
            placeholder="e.g. AAPL"
            className={styles['form__text-input']}
            {...register('ticker', { required: true })}
          />
          {errors.ticker && (
            <p className={styles['form__error-message']}>
              *Ticker name is required
            </p>
          )}
        </div>

        <p>Pick a date range:</p>
        <DateRangePicker
          className="max-w-md mx-auto"
          value={dateValue}
          onValueChange={setDateValue}
        />
        <button className={styles['form__submit-btn']} type="submit">
          Search
        </button>
      </form>
    </div>
  )
}
