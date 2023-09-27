import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { polygonAPI } from '@/lib/axios'

const groupedDailySchema = z.object({
  results: z.array(
    z.object({
      c: z.number(),
      T: z.string(),
    })
  ),
})

export type GroupedDaily = z.infer<typeof groupedDailySchema>

async function getGroupedDaily(date: string) {
  const response = await polygonAPI.get(
    `/v2/aggs/grouped/locale/us/market/stocks/${date}`
  )

  return groupedDailySchema.parse(response.data)
}

export default function useGroupedDailyData(date: string) {
  const queryResult = useQuery({
    queryKey: ['grouped-daily', date],
    queryFn: () => getGroupedDaily(date),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    enabled: true,
  })

  return queryResult
}
