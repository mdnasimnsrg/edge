'use client'
import { ISpendingPerService } from '@/@types/api/interfaces'
import { DurationSelect } from '@/components/controlled/DurationSelect'
import CardWrapper from '@/components/wrappers/card-wrapper'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { CHART_COLORS } from '@/constants/constants'
import { ANALYTICS_ENDPOINTS } from '@/endpoints/analytics'
import { useRequester } from '@/hooks/useRequester'
import { DonutChart } from '@tremor/react'
import Image from 'next/image'
import { useState } from 'react'

const dataFormatter = (number: number) => `$ ${Intl.NumberFormat('us').format(number).toString()}`

export function SpendingPerService() {
  const [selectedYear, SetSelectedYear] = useState(`${new Date().getFullYear()}`)

  const { data, isPending } = useRequester<ISpendingPerService[]>({
    endpoint: ANALYTICS_ENDPOINTS.getSpendingPerService
  })
  const totalPayment = data?.reduce((acc, { spending }) => acc + spending, 0)

  return (
    <CardWrapper
      title={
        <div className='flex gap-2'>
          <Image src={'/icons/spendingPerService.svg'} width={27} height={27} alt='' />
          <p className='font-medium text-lg'>Spending per service</p>
        </div>
      }
      action={
        <DurationSelect
          state={selectedYear}
          setState={SetSelectedYear}
          items={[
            { name: '2023', value: '2023' },
            { name: '2024', value: '2024' }
          ]}
        />
      }
      className='col-span-6 p-6'
    >
      <LoadingWrapper isLoading={isPending} isEmpty={!data?.length}>
        <div className='flex justify-start gap-[96px] border rounded-lg h-full p-4'>
          <div className='flex flex-col justify-between'>
            {data && (
              <DonutChart
                className='w-[165px] h-[165px] my-auto'
                data={data?.map(({ spending, productName }) => ({
                  name: productName,
                  value: spending
                }))}
                variant='pie'
                colors={CHART_COLORS}
                valueFormatter={dataFormatter}
              />
            )}

            <div className='flex flex-col items-center'>
              <p className='pt-3 font-medium text-lg'>Total Payment</p>
              <p className='text-primary font-semibold text-xl'>{totalPayment?.toFixed(2)} SAR </p>
            </div>
          </div>
          <div className='w-full'>
            {data && totalPayment && (
              <div className={`grid gap-4 ${data?.length > 3 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {data?.map(({ spending, productName, currency }, index) => (
                  <div className='flex gap-2 h-full ' key={index}>
                    <div className='w-4 h-2  rounded-sm mt-2' style={{ backgroundColor: CHART_COLORS[index] }} />
                    <div>
                      <p>
                        {productName}
                        <span style={{ color: CHART_COLORS[index] }} className='text-sm ms-4'>
                          ({((spending / totalPayment) * 100).toFixed(2)} %)
                        </span>
                      </p>
                      {/* <p className='text-sm text-secondary-foreground'>{formatUnderscoreString(planName)}</p> */}
                      <p className='text-secondary-foreground text-sm'>
                        {Number(spending)} {currency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </LoadingWrapper>
    </CardWrapper>
  )
}
