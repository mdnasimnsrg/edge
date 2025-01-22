import { API_URL_V1 } from './constants'
import { Endpoint } from './types'

export const SUBSCRIPTION_ENDPOINT = {
  subscribe: { url: API_URL_V1 + '/v1/rabet-subscriptions', method: 'POST' },
  unsubscribe: { url: API_URL_V1 + '/v1/rabet-subscriptions/:subscriptionId/cancel', method: 'POST' },
  changePlan: { url: API_URL_V1 + '/v1/rabet-subscriptions/:currentSubscriptionId/change', method: 'POST' }
} satisfies { [key: string]: Endpoint }
