import { type OpenCloseQuery } from '@/open-close/page'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { polygonAPI } from '@/lib/axios'

const dailyOpenCloseSchema = z.object({
  close: z.number(),
  from: z.string(),
  high: z.number(),
  low: z.number(),
  open: z.number(),
  preMarket: z.number(),
  symbol: z.string(),
  volume: z.number(),
})

export type DailyOpenClose = z.infer<typeof dailyOpenCloseSchema>

async function getDailyOpenClose(ticker: string, date: string) {
  const response = await polygonAPI.get(`/v1/open-close/${ticker}/${date}`)

  return dailyOpenCloseSchema.parse(response.data)
}

export default function useDailyOpenCloseData(query: OpenCloseQuery) {
  const queryResult = useQuery({
    queryKey: ['open-close', query],
    queryFn: () => getDailyOpenClose(query.ticker, query.date),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    enabled: true,
  })

  return queryResult
}
