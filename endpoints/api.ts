import { API_URL_V1 } from './constants'
import { Endpoint } from './types'

export const PRODUCT_API_ENDPOINTS = {
  getProductAPIs: {
    url: API_URL_V1 + '/v1/apis/products/:productId',
    method: 'POST'
  }
} satisfies { [key: string]: Endpoint }
