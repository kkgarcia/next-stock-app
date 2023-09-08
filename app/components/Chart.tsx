import { AreaChart } from '@tremor/react'
import { dataFormatter, formatArrayForAreaChart } from '../lib/utils'
import styles from './Chart.module.css'

export type ChartItem = {
  c: string
  t: string
}

type ChartProps = {
  results: ChartItem[]
  ticker: string
}

export default function Chart({ results, ticker }: ChartProps) {
  const formattedArray = formatArrayForAreaChart(results, ticker)

  return (
    <div className={styles['chart-card']}>
      <h3 className={styles['chart-card__title']}>
        Stock price of {ticker} over selected time period
      </h3>
      <AreaChart
        className="h-64 mt-4"
        data={formattedArray}
        index="date"
        categories={[ticker]}
        colors={['indigo']}
        valueFormatter={dataFormatter}
      />
    </div>
  )
}
