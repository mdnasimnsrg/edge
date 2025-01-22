'use client'
import { IPlan, IProduct_API } from '@/@types/api/interfaces'
import { SectionTitle } from '@/app/[locale]/(public)/components/SectionTitle'
import { Button } from '@/components/ui/button'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { PRODUCT_API_ENDPOINTS } from '@/endpoints/api'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'
import { Link } from '@/navigatios'
import { useParams } from 'next/navigation'

export function ProductAPIsTab() {
  const { id: productId } = useParams()

  const { data, isPending } = useRequester<IProduct_API[]>({
    endpoint: PRODUCT_API_ENDPOINTS.getProductAPIs,
    replace: { productId: productId as string }
  })

  const { data: plans, isPending: plansIspending } = useRequester<IPlan[]>({
    endpoint: PRODUCTS_ENDPOINT.getPlans,
    replace: { productId: String(productId) },
    options: { queryKey: ['dashboardPlans', productId] }
  })

  const hasOneSubscription = plans?.filter(p => p.subscribed).length === 1

  return (
    <section className='bg-[#eef6f6] px-10 py-[64px] flex w-full flex-col items-center ' id='apis'>
      <SectionTitle title='Test API' />
      <p className='text-[32px] font-medium pt-4'>
        Unlocking Trust through <span className='text-secondary'>Rabet</span> Test API
      </p>
      <LoadingWrapper isLoading={isPending}>
        <div className='py-12 flex justify-start w-full'>
          {data?.map(({ name, version, title, id }, index) => (
            <div className='w-[350px] bg-white p-4 rounded-lg shadow-custom' key={index}>
              <div className='flex items-center gap-6 h-12 border-b'>
                <p className='text-black w-[11ch]'>Title</p>
                <p className='text-secondary-foreground'>{title}</p>
              </div>
              <div className='flex items-center gap-6 h-12 border-b'>
                <p className='text-black w-[11ch]'>Name</p>
                <p className='text-secondary-foreground'>{name}</p>
              </div>
              <div className='flex items-center gap-6 h-12 '>
                <p className='text-black w-[11ch]'>Version</p>
                <p className='text-secondary-foreground'>{version}</p>
              </div>
              <div className='flex justify-end w-full'>
                {hasOneSubscription ? (
                  <Link href={`/dashboard/services/${productId}/api/${id}`}>
                    <Button isLoading={plansIspending}>Test API</Button>
                  </Link>
                ) : (
                  <Button isLoading={plansIspending} disabled>
                    Test API
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </LoadingWrapper>
    </section>
  )
}
