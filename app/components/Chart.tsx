import { type Aggregates } from '@/api/useAggregatesData'
import { AreaChart } from '@tremor/react'

import styles from './Chart.module.css'

export type ChartItem = Aggregates['results'][0]

type ChartProps = Aggregates

export default function Chart({ results, ticker }: ChartProps) {
  const formattedArray = formatArrayForAreaChart(results, ticker)

  return (
    <div className={styles['chart-card']}>
      <h3 className={styles['chart-card__title']}>
        Stock price of {ticker} over selected time period
      </h3>
      <AreaChart
        categories={[ticker]}
        className="h-64 mt-4"
        colors={['indigo']}
        data={formattedArray}
        index="date"
        valueFormatter={dataFormatter}
      />
    </div>
  )
}

function dataFormatter(number: number) {
  return '$ ' + Intl.NumberFormat('us').format(number).toString()
}

function formatArrayForAreaChart(array: ChartItem[], ticker: string) {
  if (array.length === 0) return []

  return array.map((item: ChartItem) => {
    return {
      date: Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
      }).format(new Date(item?.t || '2023-08-05')),
      [ticker]: item?.c,
    }
  })
}
