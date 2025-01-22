import { Endpoint } from '@/endpoints/types'
import axios, { AxiosError } from 'axios'
import { signOut } from 'next-auth/react'

export function requester<T>({
  endpoint,
  replace,
  options,
  token,
  responseType
}: {
  endpoint: Endpoint
  replace?: { [key: string]: string }
  options?: { params?: { [key: string]: string }; data?: { [key: string]: string } | FormData }
  token?: string
  queryParams?: { [key: string]: string }
  responseType?: any
}): Promise<T> {
  const { method } = endpoint

  const { parsedURL } = parseRequestURL({ endpoint, replace, params: options?.params })

  return axios({
    url: parsedURL,
    data: options?.data,
    headers: token ? { Authorization: 'Bearer ' + token } : {},
    method,
    ...(responseType && { responseType })
  })
    .then((res: any) => res.data)
    .catch((e: AxiosError) => {
      //@ts-ignore
      if (token && e.response?.data.message == 'Invalid Token') {
        signOut()
      }
      throw new Error('error')
    })
}

export function parseRequestURL({
  endpoint,
  replace,
  params
}: {
  endpoint: Endpoint
  replace?: { [key: string]: string }
  params?: { [key: string]: string }
}) {
  let { url } = endpoint

  if (replace) {
    Object.keys(replace).forEach(key => {
      url = url.replace(`:${key}`, replace[key])
    })
  }

  if (params) {
    url = url + '?' + new URLSearchParams(params).toString()
  }

  return { parsedURL: url }
}
