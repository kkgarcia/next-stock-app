import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getAggregates } from '../api/polygon'
import { SyncLoader } from 'react-spinners'
import styles from './App.module.css'
import Chart from './Chart'
import Form from './Form'

export type Query = {
  ticker: string
  from: string
  to: string
}

export default function App() {
  const query: Query = {
    ticker: 'AAPL',
    from: '2023-08-10',
    to: '2023-08-16',
  }

  const { isLoading, isError, error, data, refetch, isFetching } = useQuery({
    queryKey: ['aggregates'],
    queryFn: () => getAggregates(query.ticker, query.from, query.to),
    refetchOnWindowFocus: false,
    enabled: true,
  })

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
              <Form query={query} refetch={refetch} />
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
      <ReactQueryDevtools />
    </>
  )
}
