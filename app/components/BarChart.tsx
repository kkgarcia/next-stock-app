import { type GroupedDaily } from '@/api/useGroupedDailyData'
import { BarChart } from '@tremor/react'

export type BarChartItem = GroupedDaily['results'][0]

type BarChartComponentProps = {
  data?: BarChartItem[]
  limit: number
}

export default function BarChartComponent({
  data,
  limit,
}: BarChartComponentProps) {
  const chartdata = formatArrayForBarChart(data, limit)

  return (
    <BarChart
      className="mt-6"
      data={chartdata}
      index="name"
      categories={['Close price for the symbol']}
      colors={['blue']}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
    />
  )
}

function dataFormatter(number: number) {
  return '$ ' + Intl.NumberFormat('us').format(number).toString()
}

function formatArrayForBarChart(array?: BarChartItem[], limit?: number) {
  if (!array) return []

  return array.slice(0, limit).map((item) => {
    return {
      name: item.T,
      'Close price for the symbol': item.c,
    }
  })
}
