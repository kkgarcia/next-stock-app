'use client'

import { useState } from 'react'
import { type SubmitHandler } from 'react-hook-form'
import { SyncLoader } from 'react-spinners'

import useGroupedDailyData from '@/api/useGroupedDailyData'
import { format } from 'date-fns'
import { z } from 'zod'

import BarChart from '@/components/BarChart'
import DatePicker from '@/components/Form/DatePicker'
import Form from '@/components/Form/Form'
import InputField from '@/components/Form/InputField'

import styles from './page.module.css'

const schema = z.object({
  date: z.date(),
  limit: z.coerce
    .number()
    .min(1, { message: 'Min number is 1' })
    .max(50, { message: 'Max number is 50' }),
})

type FormValues = z.infer<typeof schema>

export default function Page() {
  const [queryDate, setQueryDate] = useState('2023-01-09')
  const [stockLimit, setStockLimit] = useState(10)

  const { data, isFetching, isLoading } = useGroupedDailyData(queryDate)

  const onSubmit: SubmitHandler<FormValues> = (form) => {
    setQueryDate(format(form.date, 'yyyy-MM-dd'))
    setStockLimit(form.limit)
  }

  return (
    <main>
      <section className={styles['main-section']}>
        <div className={styles['main-section_container']}>
          <div className={styles['main-section__text']}>
            Search grouped daily stocks
          </div>
          <div className={styles['main-section__form-wrapper']}>
            <div className={styles['form-wrapper']}>
              <Form onSubmit={onSubmit} schema={schema}>
                <DatePicker label="Pick a date:" name="date" />

                <InputField
                  type="number"
                  label="Limit stocks:"
                  name="limit"
                  placeholder="1 - 50"
                  className={styles['form__text-input']}
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
          <BarChart data={data?.results} limit={stockLimit} />
        )}
      </section>
    </main>
  )
}
