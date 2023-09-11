import { polygonAPI } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { type Query } from '@/page'

async function getAggregates(
  stockTicker: string,
  from: string,
  to: string,
  multiplier: number = 1,
  timespan: string = 'day'
) {
  try {
    const response = await polygonAPI.get(
      `/v2/aggs/ticker/${stockTicker}/range/${multiplier}/${timespan}/${from}/${to}`
    )

    return response.data
  } catch (error) {
    return error
  }
}

export default function useAggregatesData(query: Query) {
  const queryResult = useQuery({
    queryKey: ['aggregates', query],
    queryFn: () => getAggregates(query.ticker, query.from, query.to),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: true,
  })

  return queryResult
}
