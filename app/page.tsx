'use client'

import { useState } from 'react'
import { type SubmitHandler } from 'react-hook-form'
import { SyncLoader } from 'react-spinners'

import { format } from 'date-fns'
import { z } from 'zod'

import useAggregatesData from './api/useAggregatesData'
import Chart from './components/Chart'
import DateRangePicker from './components/Form/DateRangePicker'
import Form from './components/Form/Form'
import InputField from './components/Form/InputField'

import styles from './page.module.css'

const schema = z.object({
  ticker: z.string().min(1, { message: '*Ticker name is required' }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

export type FormValues = z.infer<typeof schema>

export type Query = {
  ticker: string
  from: string
  to: string
}

export default function Home() {
  const [query, setQuery] = useState<Query>({
    ticker: 'AAPL',
    from: '2023-08-08',
    to: '2023-08-16',
  })

  const { isLoading, isError, error, data, isFetching } =
    useAggregatesData(query)

  const onSubmit: SubmitHandler<FormValues> = (form) => {
    const query: Query = {
      ticker: form.ticker.toUpperCase(),
      from: format(form.dateRange.from, 'yyyy-MM-dd'),
      to: format(form.dateRange.to, 'yyyy-MM-dd'),
    }

    setQuery(query)
  }

  if (isError) return <pre>{JSON.stringify(error)}</pre>

  return (
    <>
      <main>
        <section className={styles['main-section']}>
          <div className={styles['main-section_container']}>
            <div className={styles['main-section__text']}>
              Search your favorite stock
            </div>
            <div className={styles['main-section__form-wrapper']}>
              <div className={styles['form-wrapper']}>
                <Form onSubmit={onSubmit} schema={schema}>
                  <InputField
                    type="text"
                    label="Enter Ticker:"
                    name="ticker"
                    placeholder="e.g. AAPL"
                    className={styles['form__text-input']}
                  />

                  <DateRangePicker
                    label="Pick a date range:"
                    name="dateRange"
                  />

                  <button className={styles['form__submit-btn']} type="submit">
                    Search
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </section>

        <section className={styles['chart-wrapper']}>
          {isLoading || isFetching ? (
            <SyncLoader color="#173b6f" />
          ) : (
            <Chart {...data} />
          )}
        </section>
      </main>
    </>
  )
}
