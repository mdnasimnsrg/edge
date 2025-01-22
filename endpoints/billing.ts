import { API_URL_V1 } from './constants'
import { Endpoint } from './types'

export const BILLING_ENDPOINT = {
  getTotalSpending: { url: API_URL_V1 + '/v1/billing/accounts/total-spending', method: 'GET' }
} satisfies { [key: string]: Endpoint }
