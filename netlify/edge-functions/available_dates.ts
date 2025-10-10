import type { Context } from '@netlify/edge-functions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (request: Request, context: Context) => {
  return Response.json([
    '2021-07-30',
    '2021-07-31',
    '2021-08-01',
    '2021-08-02',
    '2021-08-03',
    '2021-08-05',
    '2021-08-06',
    '2021-08-07',
  ])
}

export const config = { path: '/available_dates' }
