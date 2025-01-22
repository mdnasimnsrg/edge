'use client'
import { IPlan, IProduct } from '@/@types/api/interfaces'
import { queryClient } from '@/components/providers/query-client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { SUBSCRIPTION_ENDPOINT } from '@/endpoints/subscriptions'
import { useRequester } from '@/hooks/useRequester'
import { requester } from '@/lib/requester'
import { Icon } from '@iconify/react'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export function ProductDetails({ id }: { id: string }) {
  const { isFetching, data: plans } = useRequester<IPlan[]>({
    endpoint: PRODUCTS_ENDPOINT.getPlans,
    replace: { productId: id },
    options: { queryKey: ['dashboardPlans'] }
  })
  const { data } = useRequester<IProduct[]>({
    endpoint: PRODUCTS_ENDPOINT.getAll
  })

  return (
    <LoadingWrapper isLoading={isFetching}>
      {data &&
        data
          ?.filter(product => product.id === +id)
          .map(({ description, id, name, imageUrl }) => {
            return (
              <div key={id} className='flex justify-between'>
                <div>
                  <p className='text-2xl font-semibold pb-4'>{name}</p>
                  <p className='text-sm text-balance'>{description}</p>
                </div>
                {imageUrl ? (
                  <img alt='' width={100} height={40} src={imageUrl} className='object-contain' />
                ) : (
                  <div className='w-[100px]'></div>
                )}{' '}
              </div>
            )
          })}
      <Plans plans={plans} />
    </LoadingWrapper>
  )
}

function Plans({ plans }: { plans?: IPlan[] }) {
  const { data: user } = useSession()

  const { toast } = useToast()
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: any) => {
      return await requester({
        endpoint: SUBSCRIPTION_ENDPOINT.subscribe,
        options: { data: { planId: id, startDate: '2024-04-23' } },
        token: user?.user.token
      })
    },
    onSuccess: () => {
      toast({ title: 'Subscribed successfully', variant: 'success' })
      queryClient.invalidateQueries({ queryKey: ['dashboardPlans'] })
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Something went wrong' })
    }
  })

  return (
    <section className='w-full'>
      <div className='pt-8'>
        <div className='flex flex-col items-start justify-center space-y-4 '>
          <div className='space-y-2'>
            <h2 className='text-xl font-bold tracking-tighter text-start'>Pricing Plans</h2>
            <p className='max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-sm/relaxed dark:text-gray-400'>
              Choose the plan that fits your needs and budget.
            </p>
          </div>
        </div>
        <div className='grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12'>
          {plans &&
            plans?.map(({ id, description, name, price, subscribed }) => {
              return (
                <div className='rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950' key={id}>
                  <div className='space-y-4'>
                    <h3 className='text-2xl font-bold'>{name}</h3>
                    <p className='text-gray-500 dark:text-gray-400'>{description}</p>

                    <div className='flex items-end justify-between'>
                      <span className='text-4xl font-bold'>${price}</span>
                      <span className='text-sm text-gray-500 dark:text-gray-400'>/month</span>
                    </div>

                    <Button className='w-full' onClick={() => mutate(id)} disabled={subscribed}>
                      {isPending ? <Icon icon='line-md:loading-twotone-loop' fontSize={24} /> : 'Subscribe'}
                    </Button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
