// import { AUTH_ENDPOINT } from "@/endpoints/auth";
// import { requester } from "@/lib/requester";
import { Endpoint } from '@/endpoints/types'
import { requester } from '@/lib/requester'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import { useCallback, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

export function useCheckAvailability({
  name,
  endpoint,
  params,
  useFormReturn
}: {
  name: string
  instanceId?: string
  useFormReturn: UseFormReturn
  endpoint: Endpoint
  params: string
}) {
  const [loading, setLoading] = useState(false)
  const {
    watch,
    setError,
    formState: { errors }
  } = useFormReturn
  const checkServiceNameAvailability = async () => {
    setLoading(true)

    const res = await requester({
      endpoint,
      options: { params: { [params]: watch(name) } }
    })
    if (res) {
      setError(name, { type: 'required', message: 'Name already exist' })
    }
    setLoading(false)
  }

  const debounceLoadData = useCallback(debounce(checkServiceNameAvailability, 500), [])

  useEffect(() => {
    setTimeout(() => {
      if (!get(errors, name) && watch(name)) debounceLoadData()
    }, 200)
  }, [watch(name)])

  return { loading }
}
