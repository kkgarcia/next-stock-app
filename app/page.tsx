'use client'

import { useState } from 'react'
import { SyncLoader } from 'react-spinners'

import useAggregatesData from './api/useAggregatesData'
import AggregatesForm from './components/AggregatesForm'
import Chart from './components/Chart'

import styles from './page.module.css'

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
              <AggregatesForm setQuery={setQuery} />
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
