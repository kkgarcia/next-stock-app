import { ChartItem } from '../components/Chart'

export const dataFormatter = (number: number) => {
  return '$ ' + Intl.NumberFormat('us').format(number).toString()
}

export const formatArrayForAreaChart = (array: ChartItem[], ticker: string) => {
  return array.map((item: ChartItem) => {
    return {
      [ticker]: item.c,
      date: Intl.DateTimeFormat('en-GB', {
        month: 'short',
        day: 'numeric',
      }).format(new Date(item.t)),
    }
  })
}
