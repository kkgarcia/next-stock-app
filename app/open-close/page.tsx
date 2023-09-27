'use client'

import { useState } from 'react'
import { type SubmitHandler } from 'react-hook-form'
import { SyncLoader } from 'react-spinners'

import useDailyOpenCloseData from '@/api/useDailyOpenCloseData'
import { format } from 'date-fns'
import { z } from 'zod'

import DatePicker from '@/components/Form/DatePicker'
import Form from '@/components/Form/Form'
import InputField from '@/components/Form/InputField'

import styles from './page.module.css'

const schema = z.object({
  ticker: z.string().min(1, { message: '*Ticker name is required' }),
  date: z.date(),
})

type FormValues = z.infer<typeof schema>

export type OpenCloseQuery = {
  ticker: string
  date: string
}

export default function Page() {
  const [query, setQuery] = useState<OpenCloseQuery>({
    ticker: 'AAPL',
    date: '2023-08-15',
  })

  const { data, isFetching, isLoading } = useDailyOpenCloseData(query)

  const onSubmit: SubmitHandler<FormValues> = (form) => {
    const query: OpenCloseQuery = {
      ticker: form.ticker,
      date: format(form.date, 'yyyy-MM-dd'),
    }

    setQuery(query)
  }

  if (data) console.log(data)

  return (
    <main>
      <section className={styles['main-section']}>
        <div className={styles['main-section_container']}>
          <div className={styles['main-section__text']}>
            Search open and close prices of a stock
          </div>
          <div className={styles['main-section__form-wrapper']}>
            <div className={styles['form-wrapper']}>
              <Form onSubmit={onSubmit} schema={schema}>
                <InputField
                  type="text"
                  label="Ticker:"
                  name="ticker"
                  placeholder="e.g. AAPL"
                  className={styles['form__text-input']}
                />

                <DatePicker label="Pick a date:" name="date" />

                <button className={styles['form__submit-btn']} type="submit">
                  Search
                </button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <section className={styles['stock-card-wrapper']}>
        {isLoading || isFetching ? (
          <SyncLoader color="#173b6f" />
        ) : (
          <div className={styles['stock-card']}>
            <div className={styles['symbol-date-wrapper']}>
              <span className={styles['stock-card__symbol']}>
                {data?.symbol}
              </span>
              <span className={styles['stock-card__date']}>{data?.from}</span>
            </div>

            <div className={styles['data-wrapper']}>
              <div className={styles['data-block']}>
                <div className={styles['data-unit']}>
                  <p className={styles['data-property']}>Open</p>
                  <p className={styles['data-value']}>{data?.open}</p>
                </div>

                <div className={styles['data-unit']}>
                  <p className={styles['data-property']}>Close</p>
                  <p className={styles['data-value']}>{data?.close}</p>
                </div>
              </div>

              <div className={styles['data-block-divider']}></div>

              <div className={styles['data-block']}>
                <div className={styles['data-unit']}>
                  <p className={styles['data-property']}>High</p>
                  <p className={styles['data-value']}>{data?.high}</p>
                </div>

                <div className={styles['data-unit']}>
                  <p className={styles['data-property']}>Low</p>
                  <p className={styles['data-value']}>{data?.low}</p>
                </div>
              </div>

              <div className={styles['data-block-divider']}></div>

              <div className={styles['data-block']}>
                <div className={styles['data-unit']}>
                  <p className={styles['data-property']}>Pre market</p>
                  <p className={styles['data-value']}>{data?.preMarket}</p>
                </div>

                <div className={styles['data-unit']}>
                  <p className={styles['data-property']}>Volume</p>
                  <p className={styles['data-value']}>
                    {data?.volume && (data?.volume / 1000000).toFixed(2)}M
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
