export async function getAggregates(
  stockTicker: string,
  from: string,
  to: string,
  multiplier: number = 1,
  timespan: string = 'day'
) {
  try {
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${stockTicker}/range/${multiplier}/${timespan}/${from}/${to}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    )

    const data = await response.json()

    return data
  } catch (error) {
    return error
  }
}
