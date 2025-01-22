'use client'
import { IFeature, IPlan } from '@/@types/api/interfaces'
import { billingPeriods } from '@/app/[locale]/(protected)/dashboard/services/[id]/PlansTab'
import { ClientIcon } from '@/components/ui/ClitentIcon'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/button'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'
import { Link } from '@/navigatios'
import { useParams } from 'next/navigation'
import { SectionTitle } from '../../../components/SectionTitle'

export function ProductPricingPlans() {
  const params = useParams()
  const { isPending, data: plans } = useRequester<IPlan[]>({
    endpoint: PRODUCTS_ENDPOINT.getPlans,
    replace: { productId: String(params.id) }
  })

  return (
    <section className=' container '>
      <div className='flex flex-col items-center py-[100px]'>
        <SectionTitle title='Pricing Plans' />
        <p className='text-[40px] font-medium pt-3'>
          Choose your plan with <span className='text-secondary'>Rabet’s API</span> Service.
        </p>
        <p className='text-secondary-foreground text-xl font-medium'>
          Our flexible plans are designed to meet the diverse needs of businesses and developers
        </p>
        <div className='grid grid-cols-3 justify-center gap-6 pt-16  '>
          <LoadingWrapper isLoading={isPending} loadingEl={<LoadingSpinner color='#00665c' />}>
            {plans && plans?.map((plan, index) => <PricingPlanCard plan={plan} key={index} />)}
          </LoadingWrapper>
        </div>
      </div>
    </section>
  )
}

function PricingPlanCard({ plan }: { plan: IPlan }) {
  const { name,prettyName, description, price, features, icon, billing, billingPeriod, currency } = plan
 const recommended = name.includes("professional")?true:false;

  return (
    <div className={`w-[255px] relative rounded-[6px] ${recommended ? 'border border-primary ' : 'border border-[#989898] '}`}>
      {recommended && (
        <div className='h-[31px] w-full absolute top-[-31px] rounded-t-[6px] bg-secondary text-white flex justify-center items-center ] '>Recommended</div>
      )}
      <div className={`h-full w-[255px]  `}>
        <div className='border-b border-[#989898] py-6 px-4 flex flex-col justify-between items-center h-[361px]'>
          <div className='flex flex-col items-center'>
            <img src={icon} width={48} height={48} alt='plan1' className='pb-4' />
            <p className='text-xl font-medium text-black'>{prettyName.replace('_', ' ')}</p>
            <p className='text-[13px] text-black text-center h-[60px] mt-2'>{description}</p>
          </div>
          <div className='flex flex-col items-center justify-start h-[67px]'>
            {billing == 'REQUIRING' ? (
              <p>
                <span className='text-[28px] font-semibold'>{String(price)}</span> &nbsp; {currency} /{' '}
                {billingPeriods[billingPeriod]}
              </p>
            ) : (
              <>
                <p>
                  <span className='text-[28px] font-semibold'>{String(price)}</span> &nbsp; {currency} / Call
                </p>
                <p className='text-secondary-foreground text-sm'>Billed {billingPeriods[billingPeriod]}</p>
              </>
            )}
            {/* <p>
              <span className='text-[28px] font-semibold'>{String(price)}</span> &nbsp; SAR / month
            </p> */}
            {/* <p className='text-sm text-[#696969]'>{priceDiscount}</p> */}
          </div>
          <Link href={'/sign-up'} className='w-full'>
            <Button variant={recommended ? 'default' : 'outline'} className='w-full'>
              Sign Up
            </Button>
          </Link>
        </div>
        <div className='py-6 px-4 flex flex-col gap-[17px]'>
          {features.map((feature: any, index: number) => (
            <PlanBullet item={feature} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PlanBullet({ item }: { item: IFeature }) {
  const { feature, icon } = item

  return (
    <div className='flex items-center gap-4'>
      <ClientIcon icon={icon} width={24} height={24} color='#000' />
      <p className='text-sm'>{feature}</p>
    </div>
  )
}
