import { type Query } from '@/page'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { polygonAPI } from '@/lib/axios'

const aggregatesSchema = z.object({
  adjusted: z.boolean(),
  next_url: z.string().optional(),
  queryCount: z.number(),
  request_id: z.string(),
  results: z.array(
    z
      .object({
        c: z.number(),
        h: z.number(),
        l: z.number(),
        n: z.number(),
        o: z.number(),
        t: z.number(),
        v: z.number(),
        vw: z.number(),
      })
      .optional()
  ),
  resultsCount: z.number(),
  status: z.string(),
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
  try {
    const response = await polygonAPI.get(
      `/v2/aggs/ticker/${stockTicker}/range/${multiplier}/${timespan}/${from}/${to}`
    )

    const validation = aggregatesSchema.safeParse(response.data)

    if (validation.success) {
      return response.data
    }

    return validation.error
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
