'use client'
import { IFeature, IPlan } from '@/@types/api/interfaces'
import { SectionTitle } from '@/app/[locale]/(public)/components/SectionTitle'
import { ClientIcon } from '@/components/ui/ClitentIcon'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'
import { useParams } from 'next/navigation'
import { ConfirmSubscriptionDialog } from './ConfirmSubscriptionDialog'

export function PlansTab() {
  const params = useParams()
  const { isPending, data: plans } = useRequester<IPlan[]>({
    endpoint: PRODUCTS_ENDPOINT.getPlans,
    replace: { productId: String(params.id) },
    options: { queryKey: ['dashboardPlans', params.id] }
  })

  return (
    <section className='container flex flex-col items-center py-[64px] bg-white w-full'>
      <SectionTitle title='Our Plans' />
      <div className='container flex flex-col items-center py-4'>
        <p className='text-[32px] font-medium'>
          Choose <span className='text-secondary'>Rabet’s API</span> Plan that Suits Your Business
        </p>
        <LoadingWrapper isLoading={isPending} loadingEl={<LoadingSpinner color='#00665c' />}>
          <div className='grid grid-cols-3 gap-6 pt-16 '>
            {plans &&
              plans.map((plan, index) => (
                <PricingPlanCard
                  plan={plan}
                  key={index}
                  hasOneSubscription={plans.filter(p => p.subscribed).length === 1}
                />
              ))}
          </div>
        </LoadingWrapper>
      </div>
    </section>
  )
}

export const billingPeriods: any = {
  MONTHLY: 'Monthly',
  WEEKLY: 'Weekly',
  YEARLY: 'Yearly'
}

export function PricingPlanCard({
  plan,
  isChange,
  isUpgrade,
  isDowngrade,
  currentSubscriptionId,
  setOpen,
  hasOneSubscription
}: {
  plan: IPlan
  isChange?: boolean
  isUpgrade?: boolean
  isDowngrade?: boolean
  currentSubscriptionId?: string
  setOpen?: any
  hasOneSubscription?: boolean
}) {
  const { name, prettyName, description, price, features, icon, currency, billingPeriod,planType } = plan
  const isRecommend = name.includes("Professional".toLowerCase())?true:false;

  const handleConvertText = (value:string) =>{
    if(value==="MONTHLY") return "Month"
    if(value==="WEEKLY") return "Week"
    if(value==="ANNUAL") return "Year"
  }

  return (
    <div
      className={`w-[255px] relative rounded-[6px]  h-full ${
        isRecommend ? 'border border-primary ' : 'border border-[#989898] '
      }`}
    >
      {isRecommend && (
        <div className='h-[31px] bg-secondary w-full rounded-t-[6px] absolute -top-[31px] text-white flex justify-center items-center ] '>Recommended</div>
      )}
      <div className={` w-[255px] `}>
        <div className='border-b border-[#989898] py-6 px-4 flex flex-col justify-between items-center h-[361px] '>
          <div className='flex flex-col items-center '>
            <img src={icon} width={48} height={48} alt='plan1' className='pb-4' />
            <p className='text-xl font-medium text-black text-center'>{prettyName.replace('_', ' ')}</p>
            <p className='text-[13px] text-black text-center h-[60px] mt-2'>{description}</p>
          </div>
          <div className='flex flex-col items-center justify-start h-[67px]'>
            {planType.name == 'USAGE BASED' ? (
              <p>
                <span className='text-[28px] font-semibold'>{String(price)}</span> &nbsp; {currency} /{'Call'}
                <p className='text-secondary-foreground text-sm'>Billed {billingPeriods[billingPeriod]}</p>
              </p>
            ) : (
              <>
                <p>
                  <span className='text-[28px] font-semibold'>{String(price)}</span> &nbsp; {currency} / {handleConvertText(billingPeriod)}
                </p>
                <p className='text-secondary-foreground text-sm'>Billed {billingPeriods[billingPeriod]}</p>
              </>
            )}
          </div>

          <ConfirmSubscriptionDialog
            plan={plan}
            isChange={isChange}
            isUpgrade={isUpgrade}
            isDowngrade={isDowngrade}
            hasOneSubscription={hasOneSubscription}
            setOpen={setOpen}
            billingPeriod={billingPeriod}
            currentSubscriptionId={currentSubscriptionId}
          />
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
      <ClientIcon icon={icon} color='#000' fontSize={22} />
      <p className='text-sm'>{feature}</p>
    </div>
  )
}
