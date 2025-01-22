import { API_URL_V1 } from './constants'
import { Endpoint } from './types'

export const USERS_ENDPOINT = {
  getSubscriptions: { url: API_URL_V1 + '/v1/users/me/subscriptions', method: 'GET' },
  getInvoices: { url: API_URL_V1 + '/v1/users/me/invoices', method: 'GET' },
  getPayments: { url: API_URL_V1 + '/v1/users/me/payments', method: 'GET' },
  checkUsername: { url: API_URL_V1 + '/v1/users/check-username', method: 'GET' },
  checkEmail: { url: API_URL_V1 + '/v1/users/check-email', method: 'GET' },
  getProfile: { url: API_URL_V1 + '/v1/users/me/profile', method: 'GET' },
  updateProfile: { url: API_URL_V1 + '/v1/users/me/profile', method: 'PATCH' },
  updatePassword: { url: API_URL_V1 + '/v1/users/update-password', method: 'POST' },
  updatePhoto: { url: API_URL_V1 + '/v1/users/avatar/upload', method: 'PUT' }
} satisfies { [key: string]: Endpoint }
