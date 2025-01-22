'use client'

import { IInvoice } from '@/@types/api/interfaces'
import { DataTable } from '@/components/table'
import CardWrapper from '@/components/wrappers/card-wrapper'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { CONSUMER_ORGANIZATIONS_ENDPOINTS } from '@/endpoints/consumer-organizations'
import { useRequester } from '@/hooks/useRequester'
import { Link } from '@/navigatios'
import Image from 'next/image'
import { useInvoiceColumns } from '../invoices/columns'

export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export function Invoices() {
  const { data: invoices, isPending } = useRequester<IInvoice[]>({
    endpoint: CONSUMER_ORGANIZATIONS_ENDPOINTS.getInvoices
  })

  const { invoiceColumns } = useInvoiceColumns()

  return (
    <CardWrapper
      title={
        <div className='flex gap-2'>
          <Image src={'/icons/invoices.svg'} width={27} height={27} alt='' />
          <p className='font-medium text-lg'>Invoices</p>
        </div>
      }
      className='col-span-12'
      action={
        <Link href={'/dashboard/invoices'}>
          <p className='text-primary text-[15px] font-medium'>See All</p>
        </Link>
      }
    >
      <LoadingWrapper isLoading={isPending}>
        <DataTable columns={invoiceColumns} data={invoices || []} />
      </LoadingWrapper>
    </CardWrapper>
  )
}
