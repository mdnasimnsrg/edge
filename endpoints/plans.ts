import { API_URL_V1 } from './constants'
import { Endpoint } from './types'

export const PLANS_ENDPOINT = {
  getPlans: { url: API_URL_V1 + '/v1/plans', method: 'GET' }
} satisfies { [key: string]: Endpoint }
