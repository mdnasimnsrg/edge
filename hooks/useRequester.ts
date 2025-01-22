import { Endpoint } from '@/endpoints/types'
import { parseRequestURL, requester } from '@/lib/requester'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export function useRequester<T>({
  endpoint,
  options,
  replace,
  params
}: {
  endpoint: Endpoint
  options?: UseQueryOptions<T>
  replace?: { [key: string]: string }
  params?: { [key: string]: string }
}) {
  const { parsedURL } = parseRequestURL({ endpoint, replace, params })
  const { data: user } = useSession()

  const { ...rest } = useQuery<T>({
    queryFn: () => {
      return requester<T>({
        endpoint,
        options: { params },
        token: user?.user.token,
        replace
      })
    },

    retry: 0,
    enabled: user ? Boolean(user.user.token) : true,
    refetchOnWindowFocus: false,
    queryKey: options?.queryKey || [parsedURL],
    ...options
  })

  return { ...rest }
}
