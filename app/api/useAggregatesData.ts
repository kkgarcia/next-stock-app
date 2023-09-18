import { type Query } from '@/page'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { polygonAPI } from '@/lib/axios'

const aggregatesSchema = z.object({
  results: z.array(
    z
      .object({
        c: z.number(),
        t: z.number(),
      })
      .optional()
  ),
  ticker: z.string(),
})

export type Aggregates = z.infer<typeof aggregatesSchema>

async function getAggregates(
  stockTicker: string,
  from: string,
  to: string,
  multiplier: number = 1,
  timespan: string = 'day'
) {
  const response = await polygonAPI.get(
    `/v2/aggs/ticker/${stockTicker}/range/${multiplier}/${timespan}/${from}/${to}`
  )

  return aggregatesSchema.parse(response.data)
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
