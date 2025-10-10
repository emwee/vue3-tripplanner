import type { Context } from '@netlify/edge-functions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (request: Request, context: Context) => {
  return Response.json({
    'United States': [
      [260932, 'New York'],
      [79889, 'Orlando'],
      [82073, 'Las Vegas'],
      [79751, 'Washington D-c'],
      [1772, 'San Francisco'],
      [80874, 'Boston'],
      [79946, 'Tampa'],
      [80816, 'Chicago'],
      [80026, 'Savannah'],
      [79868, 'Miami'],
      [122690, 'Saint Augustine'],
      [79844, 'Key West'],
    ],
    France: [
      [66746, 'Paris'],
      [66735, 'Poitiers'],
      [260936, 'Le Mont-saint-michel'],
      [66615, 'Tours'],
      [67073, 'Carcassonne'],
      [66770, 'Nice'],
      [66838, 'Lyon'],
      [66788, 'Montpellier'],
      [66619, 'Toulouse'],
    ],
    Spain: [
      [66154, 'Tarragona'],
      [66254, 'Madrid'],
      [66825, 'Marseille'],
      [66342, 'Barcelona'],
      [461, 'Tenerife'],
      [32, 'Malaga'],
    ],
    Italy: [
      [71506, 'Verona'],
      [71631, 'Rome'],
      [71720, 'Naples'],
      [558, 'Sicily'],
      [71634, 'Rimini'],
      [71510, 'Venice'],
    ],
    Denmark: [[113, 'Copenhagen']],
    Sweden: [[1638, 'Stockholm']],
    UAE: [
      [60005, 'Dubai'],
      [60013, 'Abu Dhabi'],
    ],
    Singapore: [[78125, 'Singapore']],
    Romania: [[115866, 'Bran']],
    Netherlands: [
      [75061, 'Amsterdam'],
      [74866, 'Utrecht'],
    ],
    'United Kingdom': [
      [21, 'Edinburgh'],
      [67204, 'York'],
    ],
    'Czech Republic': [[64187, 'Kutna Hora']],
    Austria: [[60335, 'Vienna']],
    Mexico: [[24, 'Cancun']],
  })
}

export const config = { path: '/locations' }
