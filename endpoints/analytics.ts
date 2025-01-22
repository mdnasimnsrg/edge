import { API_URL_V1 } from './constants'
import { Endpoint } from './types'

export const ANALYTICS_ENDPOINTS = {
  getTotalCallsPerProduct: {
    url: API_URL_V1 + '/v1/analytics/total-call-per-product',
    method: 'GET'
  },
  getUpcomingRenewal: {
    url: API_URL_V1 + '/v1/analytics/upcoming-renewal',
    method: 'GET'
  },
  getSpendingPerService: {
    url: API_URL_V1 + '/v1/analytics/spending-per-service',
    method: 'GET'
  },
  getConsumerOrganizations: {
    url: API_URL_V1 + '/v1/analytics/consumer-org',
    method: 'GET'
  },
  getTopUsage: {
    url: API_URL_V1 + '/v1/analytics/consumer-org/dashboard',
    method: 'GET'
  },
  getSpendingPlansAndProducts: {
    url: API_URL_V1 + '/v1/analytics/top-spending-plans-and-products',
    method: 'GET'
  },
  getProductLatency: {
    url: API_URL_V1 + '/v1/analytics/consumer-org/latency',
    method: 'GET'
  },
  getTotalSpending: {
    url: API_URL_V1 + '/v1/analytics/total-spending',
    method: 'GET'
  },
  getAnalysis: {
    url: API_URL_V1 + '/v1/analytics',
    method: 'GET'
  }
} satisfies { [key: string]: Endpoint }
