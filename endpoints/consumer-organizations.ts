import { API_URL_V1 } from './constants'
import { Endpoint } from './types'

export const CONSUMER_ORGANIZATIONS_ENDPOINTS = {
  checkName: {
    url: API_URL_V1 + '/v1/consumer-organizations/check-organization-name',
    method: 'GET'
  },
  getInvoices: {
    url: API_URL_V1 + '/v1/consumer-organizations/me/invoices',
    method: 'GET'
  },
  getPayments: {
    url: API_URL_V1 + '/v1/consumer-organizations/me/payments',
    method: 'GET'
  },
  getActiveSubscriptions: {
    url: API_URL_V1 + '/v1/consumer-organizations/me/current-subscriptions',
    method: 'GET'
  },
  getInActiveSubscriptions: {
    url: API_URL_V1 + '/v1/consumer-organizations/me/inactive-subscriptions',
    method: 'GET'
  },
  getSubscriptionHistory: {
    url: API_URL_V1 + '/v1/consumer-organizations/me/subscriptions/history',
    method: 'GET'
  }
} satisfies { [key: string]: Endpoint }
