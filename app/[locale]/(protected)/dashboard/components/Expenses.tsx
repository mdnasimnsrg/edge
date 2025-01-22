'use client'
import { DurationSelect } from '@/components/controlled/DurationSelect'
import CardWrapper from '@/components/wrappers/card-wrapper'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { MONTHS_INDEX } from '@/constants/constants'
import { ANALYTICS_ENDPOINTS } from '@/endpoints/analytics'
import { useRequester } from '@/hooks/useRequester'
import { BarChart } from '@tremor/react'
import Image from 'next/image'
import { useState } from 'react'

const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString()

export function Expenses() {
  const [selectedYear, SetSelectedYear] = useState(`${new Date().getFullYear()}`)

  const { data, isPending } = useRequester<{ month: string; spending: string }[]>({
    endpoint: ANALYTICS_ENDPOINTS.getTotalSpending
  })

  const currentMonth = new Date().getMonth() + 1

  return (
    <CardWrapper
      title={
        <div className='flex gap-2'>
          <Image src={'/icons/totalExpenses.svg'} width={27} height={27} alt='' />
          <p className='font-medium text-lg'>Total Expense</p>
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
      className='col-span-6'
    >
      <LoadingWrapper isLoading={isPending}>
        <BarChart
          data={
            data?.length
              ? Array.from({ length: currentMonth }).map((_, index: number) => {
                  return {
                    name: MONTHS_INDEX[index + 1],
                    amount: Number(data?.find(({ month }) => month == String(index + 1))?.spending) || 0
                  }
                })
              : []
          }
          index='name'
          categories={['amount']}
          colors={['#009d89']}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </LoadingWrapper>
    </CardWrapper>
  )
}
