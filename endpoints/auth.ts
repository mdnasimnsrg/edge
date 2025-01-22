import { API_URL_V1 } from './constants'
import { Endpoint } from './types'

export const AUTH_ENDPOINTS = {
  register: { url: API_URL_V1 + '/v1/users', method: 'POST' },
  login: { url: API_URL_V1 + '/login', method: 'POST' },
  resetPassword: { url: API_URL_V1 + '/v1/users/send-mail-reset-password', method: 'POST' },
  createNewPassword: { url: API_URL_V1 + '/v1/users/reset-password', method: 'POST' }
} satisfies { [key: string]: Endpoint }
