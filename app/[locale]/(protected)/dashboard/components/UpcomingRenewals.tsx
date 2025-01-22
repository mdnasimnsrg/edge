'use client'
import { IUpcomingRenewals } from '@/@types/api/interfaces'
import { Skeleton } from '@/components/ui/skeleton'
import CardWrapper from '@/components/wrappers/card-wrapper'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { ANALYTICS_ENDPOINTS } from '@/endpoints/analytics'
import { useRequester } from '@/hooks/useRequester'
import { Link } from '@/navigatios'
import { formatDate } from '@/utils/formatDate'
import { formatUnderscoreString } from '@/utils/formatUnderscoreString'
import { Icon } from '@iconify/react'
import moment from 'moment'
import Image from 'next/image'

export function UpcomingRenewals() {
  const { data, isPending } = useRequester<IUpcomingRenewals[]>({ endpoint: ANALYTICS_ENDPOINTS.getUpcomingRenewal })

  return (
    <CardWrapper
      title={
        <div className='flex gap-2'>
          <Image src={'/icons/upcomingRenewals.svg'} width={27} height={27} alt='' />
          <p className='font-medium text-lg'>Upcoming renewals</p>
        </div>
      }
      className='col-span-8'
      action={
        <Link href={'/dashboard/subscriptions'}>
          <p className='text-primary text-[15px] font-medium'>See All</p>
        </Link>
      }
    >
      <LoadingWrapper
        isLoading={isPending}
        isEmpty={!data?.length}
        loadingEl={
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 '>
            <SubscriptionCardSkeleton />
            <SubscriptionCardSkeleton />
          </div>
        }
      >
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 '>
          {data && data?.slice(0, 2).map((data, index: number) => <SubscriptionCard key={index} data={data} />)}
        </div>
      </LoadingWrapper>
    </CardWrapper>
  )
}

export function SubscriptionCard({ data }: { data: IUpcomingRenewals }) {
  const { dayLeft, endDate, price, serviceName, startDate, serviceImage, planName } = data

  return (
    <div className='border border-input rounded-[4px] flex flex-col gap-6 p-6 '>
      <div className='flex gap-2 h-[64px]'>
        <img src={serviceImage} width={64} height={64} alt='' className='object-contain' />
        <div className='flex flex-col justify-center gap-2'>
          <p className='text-base font-semibold '>{serviceName}</p>
          <p className='text-secondary-foreground text-sm'>{formatUnderscoreString(planName)}</p>
        </div>
      </div>
      <div className='h-fit flex w-full items-center gap-2 text-sm'>
        <Icon icon='heroicons:calendar' fontSize={24} />
        <div className='font-medium flex gap-[17px] w-full'>
          <div>
            <span> From : </span>
            <span className='text-secondary-foreground'>{moment(formatDate(startDate)).format('DD MMM YYYY')}</span>
          </div>
          <div>
            <span>To : </span>
            <span className='text-secondary-foreground'>{moment(formatDate(endDate)).format('DD MMM YYYY')}</span>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div className='px-4 py-2 border-dashed border-2 border-input rounded-[4px] flex justify-center items-center '>
          <span className={`font-semibold text-sm ${dayLeft >= 0 ? 'text-primary' : 'text-red-500'}`}>{dayLeft}</span>
          <span className='px-1'>Days Left</span>
          &nbsp;
        </div>
        <div className='px-4 py-2 border-dashed border-2 border-input  rounded-[4px] flex justify-center items-center '>
          <span className='text-primary font-semibold text-sm'>{price} SAR</span> &nbsp; Cost
        </div>
      </div>
    </div>
  )
}

function SubscriptionCardSkeleton() {
  return (
    <div className='border border-input rounded-2xl flex flex-col gap-6 justify-between p-6 w-full'>
      <div className='flex gap-2'>
        <div className='h-14 w-14 rounded-full flex items-center justify-center'>
          <Skeleton className='w-[48px] h-[48px] rounded-full mb-2' />
        </div>
        <div>
          <Skeleton className='w-[100px] h-4 mb-2' />
          <Skeleton className='w-full h-4' />
        </div>
      </div>
      <div className='h-fit flex w-full items-center gap-2'>
        <Skeleton className='w-[300px] h-4' />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div className='px-4 py-2 border-dashed border-2 rounded-xl flex justify-center items-center text-secondary-foreground'>
          <Skeleton className='w-[300px] h-4' />
        </div>
        <div className='px-4 py-2 border-dashed border-2 rounded-xl flex justify-center items-center text-secondary-foreground'>
          <Skeleton className='w-[300px] h-4' />
        </div>
      </div>
    </div>
  )
}
