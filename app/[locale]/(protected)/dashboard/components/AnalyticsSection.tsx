'use client'
import { ICONSUMER_ORG, IProduct_Latency, ITop_Usage, ITotalCost } from '@/@types/api/interfaces'
import { DurationSelect } from '@/components/controlled/DurationSelect'
import { Skeleton } from '@/components/ui/skeleton'
import CardWrapper from '@/components/wrappers/card-wrapper'
import { ANALYTICS_ENDPOINTS } from '@/endpoints/analytics'
import { useRequester } from '@/hooks/useRequester'
import Image from 'next/image'
import { useState } from 'react'

export function AnalyticsSection() {
  const [selectedDuration, setSelectedDuration] = useState('week')

  const { data, isPending } = useRequester<ICONSUMER_ORG>({
    endpoint: ANALYTICS_ENDPOINTS.getConsumerOrganizations
  })
  const { data: topUsage, isPending: topUsageIsPending } = useRequester<ITop_Usage>({
    endpoint: ANALYTICS_ENDPOINTS.getTopUsage
  })
  const { data: latency, isPending: latencyIsPending } = useRequester<IProduct_Latency>({
    endpoint: ANALYTICS_ENDPOINTS.getProductLatency
  })
  const { data: spending, isPending: SpendingIsPending } = useRequester<ITotalCost[]>({
    endpoint: ANALYTICS_ENDPOINTS.getSpendingPlansAndProducts
  })

  return (
    <CardWrapper
      title={
        <div className='flex gap-2'>
          <Image src={'/icons/analytics.svg'} width={27} height={27} alt='' />
          <p className='font-medium text-lg'>Analytics Overview</p>
        </div>
      }
      action={
        <DurationSelect
          setState={setSelectedDuration}
          state={selectedDuration}
          items={[
            { name: 'Last Week', value: 'week' },
            { name: 'Last Month', value: 'month' },
            { name: 'Last Year', value: 'year' }
          ]}
        />
      }
      className='col-span-12'
    >
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-[30px] pt-2 '>
        <AnalyticsCard
          details={{
            isPending: topUsageIsPending,
            color: 'bg-[#ea9326]',
            title: 'Top Usage',
            icon: '/icons/analytics/usage.svg',
            items:
              topUsage?.top_products_by_calls?.data?.slice(0, 3).map(({ group, value }) => ({
                name: `${group} `,
                value: `${value?.toString()} Req.`
              })) || []
          }}
        />
        <AnalyticsCard
          details={{
            isPending: SpendingIsPending,
            color: 'bg-[#009d89]',
            title: 'Top Cost',
            icon: '/icons/analytics/sr.svg',
            items:
              spending?.slice(0, 3).map(({ productName, amount }) => ({
                name: productName,
                value: `${Number(amount)?.toFixed()} SAR`
              })) || []
          }}
        />
        <AnalyticsCard
          details={{
            isPending: latencyIsPending,
            color: 'bg-[#2183e7]',
            title: 'Latency',
            icon: '/icons/analytics/latency.svg',
            items: latency
              ? [
                  { name: 'Avg response Time', value: latency?.avg_response_time.data.toFixed(2) + ' MS' },
                  { name: 'Max response Time', value: latency?.max_response_time.data.toFixed(2) + ' MS' },
                  { name: 'Min response Time', value: latency?.min_response_time.data.toFixed(2) + ' MS' }
                ]
              : []
          }}
        />
        <AnalyticsCard
          details={{
            isPending,
            color: 'bg-[#00c955]',
            title: 'Top Health',
            icon: '/icons/analytics/health.svg',
            items:
              data?.product_leaderboard?.slice(0, 3).map(({ ref, total, success }) => ({
                name: ref,
                value: `${((success / total) * 100).toFixed()}%`
              })) || []
          }}
        />
      </div>
    </CardWrapper>
  )
}

interface IDetails {
  color: string
  title: string
  icon: string
  isPending: boolean
  items: { name?: string; value?: string }[]
}
function AnalyticsCard({ details }: { details: IDetails }) {
  const { color, items, title, icon, isPending } = details

  if (isPending)
    return (
      <div className={`flex flex-col text-white w-full rounded-lg ${color} `}>
        <div className='p-3 border-b border-white text-lg font-medium flex gap-2 items-center'>
          <Image src={icon} width={24} height={24} alt='' className='object-contain' quality={100} />
          {title}
        </div>
        <div className='px-3 '>
          {Array.from({ length: 3 })?.map((_, index) => (
            <div className={`flex justify-between py-2 `} key={index}>
              <Skeleton className='h-4 w-[120px]' />
              <Skeleton className='h-4 w-[60px]' />
            </div>
          ))}
        </div>
      </div>
    )

  return (
    <div className={`flex flex-col text-white w-full rounded-[4px] ${color} `}>
      <div className='p-3 border-b border-white text-lg font-medium flex gap-2 items-center'>
        <Image src={icon} width={24} height={24} alt='' className='object-contain' quality={100} />
        {title}
      </div>
      <div className='px-3 h-[109px] w-full'>
        {items.length ? (
          items?.map(({ name, value }, index) => (
            <div className={`flex justify-between py-2 `} key={index}>
              <span className='text-sm'>{name}</span>
              <span className='text-sm'>{value}</span>
            </div>
          ))
        ) : (
          <div className='text-sm h-full w-full flex justify-center items-center '>
            <p>No data</p>
          </div>
        )}
      </div>
    </div>
  )
}
