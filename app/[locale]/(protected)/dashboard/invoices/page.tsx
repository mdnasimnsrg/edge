'use client'
import { IInvoice } from '@/@types/api/interfaces'
import { DataTable } from '@/components/table'
import { Skeleton } from '@/components/ui/skeleton'
import CardWrapper from '@/components/wrappers/card-wrapper'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import PageWrapper from '@/components/wrappers/page-wrapper'
import { CONSUMER_ORGANIZATIONS_ENDPOINTS } from '@/endpoints/consumer-organizations'
import { useRequester } from '@/hooks/useRequester'
import Image from 'next/image'
import { useInvoiceColumns } from './columns'

export default function Invoices() {
  const { data: invoices, isPending } = useRequester<IInvoice[]>({
    endpoint: CONSUMER_ORGANIZATIONS_ENDPOINTS.getInvoices
  })

  const totalCost = invoices && invoices?.length > 0 && invoices?.reduce((acc, { totalAmount }) => acc + totalAmount, 0)

  const totalProvider = new Set()

  if (invoices && invoices?.length > 0) {
    invoices?.forEach(({ items }) => {
      if (items[0]?.prettyProductName) totalProvider.add(items[0]?.prettyProductName)
    })
  }

  const { invoiceColumns } = useInvoiceColumns()

  return (
    <PageWrapper
      breadcrumbs={[
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/invoices', label: 'Invoices' }
      ]}
    >
      <div className='grid grid-cols-1  lg:grid-cols-3 gap-7 pb-8'>
        <InvoicesInfoCard
          img='/invoices/invoices.svg'
          value={invoices?.length}
          title={'Total Invoices'}
          isPending={isPending}
          bgColor={'bg-[#009d89]'}
        />
        <InvoicesInfoCard
          value={`${totalCost} SAR`}
          title={'Total Cost'}
          isPending={isPending}
          bgColor={'bg-[#ed972b]'}
          img='/invoices/sar.svg'
        />
        <InvoicesInfoCard
          img='/invoices/provider.svg'
          value={totalProvider.size}
          title={'Total Plans'}
          isPending={isPending}
          bgColor={'bg-[#2183e7]'}
        />
      </div>
      <CardWrapper title='Invoices'>
        <LoadingWrapper isLoading={isPending}>
          <DataTable columns={invoiceColumns} data={invoices || []} pageSize={10} />
        </LoadingWrapper>
      </CardWrapper>
    </PageWrapper>
  )
}

function InvoicesInfoCard({
  title,
  value,
  isPending,
  bgColor,
  img
}: {
  title: string | undefined
  value: number | undefined | false | React.ReactNode
  isPending: boolean
  bgColor: string
  img: string
}) {
  return (
    <div className={`flex flex-col text-white w-full  rounded-lg ${bgColor} `}>
      <div className='p-3  text-lg font-medium flex gap-2 items-center'>
        <Image src={img} alt='' className='object-contain' width={32} height={32} />
        {title}
      </div>
      <div className='px-3 w-full'>
        {isPending ? <Skeleton className='h-12 w-[100px]' /> : <p className='text-3xl font-medium'>{value || 0}</p>}
      </div>
    </div>
  )

  return (
    <div className={`p-8 flex justify-between w-full rounded-lg  ${bgColor}`}>
      <div className='text-white flex flex-col justify-between'>
        {isPending ? <Skeleton className='h-12 w-[100px]' /> : <p className='text-5xl font-medium'>{value || 0}</p>}
        <p className='text-xl font-medium'>{title}</p>
      </div>
      <Image src={img} alt='' className='object-contain' width={88} height={88} />
    </div>
  )
}
