'use client'
import { IPayment } from '@/@types/api/interfaces'
import { ScrollArea } from '@/components/ui/scroll-area'
import CardWrapper from '@/components/wrappers/card-wrapper'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { CONSUMER_ORGANIZATIONS_ENDPOINTS } from '@/endpoints/consumer-organizations'
import { useRequester } from '@/hooks/useRequester'
import { Link } from '@/navigatios'
import { formatDate } from '@/utils/formatDate'
import moment from 'moment'
import Image from 'next/image'

export function LastTransaction() {
  const { data, isPending } = useRequester<IPayment[]>({ endpoint: CONSUMER_ORGANIZATIONS_ENDPOINTS.getPayments })

  return (
    <CardWrapper
      title={
        <div className='flex gap-2'>
          <Image src={'/icons/lastTransactions.svg'} width={27} height={27} alt='' />
          <p className='font-medium text-lg'>Last transaction</p>
        </div>
      }
      className='col-span-4'
      action={
        <Link href={'/dashboard/transaction'}>
          <p className='text-primary text-[15px] font-medium'>See All</p>
        </Link>
      }
    >
      <LoadingWrapper isLoading={isPending} isEmpty={!data?.length}>
        <ScrollArea className='h-full px-6 border border-input py-3 rounded-[4px]'>
          <div className='flex flex-col gap-4 '>
            {data &&
              data.map(({ purchasedAmount, currency, transactions }, index) => (
                <div className='flex justify-between items-center' key={index}>
                  <div className='flex gap-4'>
                    {/* <div className='bg-[#e6f1f8] h-14 w-14 rounded-full flex items-center justify-center'>
                      <Image src={'/products/yakeen-logo.svg'} width={48} height={48} alt='' />
                    </div> */}
                    <div>
                      {/* <p className=' font-semibold'>Yakeen</p> */}
                      <p className='text-secondary-foreground'>
                        {moment(formatDate(transactions[0].effectiveDate)).format('DD MMM YY')}
                      </p>
                    </div>
                  </div>
                  <p className='text-sm text-[#00AC9C] font-medium'>
                    {purchasedAmount} {currency}
                  </p>
                </div>
              ))}
          </div>
        </ScrollArea>
      </LoadingWrapper>
    </CardWrapper>
  )
}
