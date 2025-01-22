'use client'
import { IPlan, IProduct } from '@/@types/api/interfaces'
import { Button } from '@/components/ui/button'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'
import { Link } from '@/navigatios'

export function ProductDetails({ id }: { id: string }) {
  const { isLoading, data: plans } = useRequester<IPlan[]>({
    endpoint: PRODUCTS_ENDPOINT.getPlans,
    replace: { productId: id }
  })
  const { data } = useRequester<IProduct[]>({ endpoint: PRODUCTS_ENDPOINT.getAll })

  return (
    <>
      <LoadingWrapper isLoading={isLoading}>
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
    </>
  )
}

function Plans({ plans }: { plans?: IPlan[] }) {
  return (
    <section className='w-full '>
      <div className='pt-8'>
        <div className='flex flex-col items-start  space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-xl font-bold tracking-tighter text-start'>Pricing Plans</h2>
            <p className='max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-sm/relaxed dark:text-gray-400'>
              Choose the plan that fits your needs and budget.
            </p>
          </div>
        </div>
        <div className=' grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12'>
          {plans &&
            plans?.map(({ id, description, name, price }) => {
              return (
                <div className='rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950' key={id}>
                  <div className='space-y-4'>
                    <h3 className='text-2xl font-bold'>{name}</h3>
                    <p className='text-gray-500 dark:text-gray-400'>{description}</p>

                    <div className='flex items-end justify-between'>
                      <span className='text-4xl font-bold'>${price}</span>
                      <span className='text-sm text-gray-500 dark:text-gray-400'>/month</span>
                    </div>
                    <Link href={'/sign-up?planId=' + id}>
                      <Button className='w-full my-2'>Get Started</Button>
                    </Link>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
