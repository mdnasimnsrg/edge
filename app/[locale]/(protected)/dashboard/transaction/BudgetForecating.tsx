'use client'
import { BarChart } from '@tremor/react'

const chartdata = [
  {
    name: 'JAN',
    Past: 5
  },
  {
    name: 'FEB',
    Past: 10
  },
  {
    name: 'MAR',
    Past: 25
  },
  {
    name: 'APR',
    Past: 50
  },
  {
    name: 'MAY',
    Past: 200
  },
  {
    name: 'JUN',
    Past: null,
    Future: 300
  },
  {
    name: 'JUL',
    Past: null,
    Future: 400
  }
]

const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString()

export function BudgetForeCasting() {
  return (
    <>
      <BarChart
        className='mt-6'
        data={chartdata}
        index='name'
        categories={['Past', 'Future']}
        colors={['#009d89', '#b3e1db']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </>
  )
}
