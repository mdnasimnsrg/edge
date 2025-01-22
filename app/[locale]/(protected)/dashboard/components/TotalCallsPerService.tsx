'use client'

import { IAnalysis } from '@/@types/api/interfaces'
import { DurationSelect } from '@/components/controlled/DurationSelect'
import CardWrapper from '@/components/wrappers/card-wrapper'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { CHART_COLORS, MONTHS } from '@/constants/constants'
import { ANALYTICS_ENDPOINTS } from '@/endpoints/analytics'
import { useRequester } from '@/hooks/useRequester'
import { BarChart } from '@tremor/react'
import Image from 'next/image'
import { useState } from 'react'

export function TotalCallsPerService() {
  const [selectedYear, SetSelectedYear] = useState(`${new Date().getFullYear()}`)
  const { data, isPending: topUsageIsPending } = useRequester<IAnalysis>({
    endpoint: ANALYTICS_ENDPOINTS.getAnalysis
  })

  const chartData: any[] = []
  const categories: any[] = []

  data &&
    Object.values(data).forEach(values => {
      values.forEach(({ group }) => {
        if (categories.includes(group)) return
        categories.push(group)
      })
    })

  data &&
    Object.entries(data).forEach(([key]) => {
      const valuesObj: any = {}
      data[key].forEach(value => {
        valuesObj[value.group] = value.value
      })
      chartData.push({
        name: key,
        ...valuesObj
      })
    })

  chartData?.sort((a: any, b: any) => {
    const monthA = MONTHS[a.name]
    const monthB = MONTHS[b.name]

    return monthA - monthB
  })

  const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString()

  return (
    <CardWrapper
      title={
        <div className='flex gap-2'>
          <Image src={'/icons/totalCallsPerServices.svg'} width={27} height={27} alt='' />
          <p className='font-medium text-lg'>Total calls per service</p>
        </div>
      }
      action={
        <DurationSelect items={[{ name: '2024', value: '2024' }]} state={selectedYear} setState={SetSelectedYear} />
      }
      className='col-span-12'
    >
      <LoadingWrapper isLoading={topUsageIsPending}>
        <BarChart
          className='h-[204px]'
          data={chartData}
          index='name'
          categories={categories}
          colors={CHART_COLORS}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </LoadingWrapper>
    </CardWrapper>
  )
}
