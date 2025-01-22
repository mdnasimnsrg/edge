'use client'
import { IInvoice } from '@/@types/api/interfaces'
import { ClientIcon } from '@/components/ui/ClitentIcon'
import { INVOICES_ENDPOINTS } from '@/endpoints/invoices'
import { requester } from '@/lib/requester'
import { Link } from '@/navigatios'
import { formatDate } from '@/utils/formatDate'
import { useMutation } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { useSession } from 'next-auth/react'

export function useInvoiceColumns() {
  const invoiceColumns: ColumnDef<IInvoice>[] = [
    {
      accessorKey: 'invoiceNumber',
      header: () => <p>Invoice Ref.</p>,
      cell: ({ row }) => {
        return (
          <Link className='underline text-[#3699FF]' href={`/dashboard/invoices/${row.original.invoiceId}`}>
            INV{row.original.invoiceNumber}
          </Link>
        )
      }
    },
    {
      accessorKey: 'plans',
      header: () => <p>Plans</p>,
      cell: ({ row }) => <p className='text-secondary-foreground'>{row.original.items[0].prettyProductName}</p>
    },
    {
      accessorKey: 'invoiceDate',
      header: () => <p>Due Date</p>,
      cell: ({ row }) => {
        return (
          <p className='text-secondary-foreground'>
            {moment(formatDate(row.original.invoiceDate)).format('DD MMM YY')}
          </p>
        )
      }
    },
    {
      accessorKey: 'amount',
      header: () => <p>Amount</p>,
      cell: ({ row }) => {
        return (
          <p className='text-primary font-medium'>
            {row.original.totalAmount} {row.original.currency}
          </p>
        )
      }
    },
    {
      accessorKey: 'Status',
      header: () => <p>Status</p>,
      cell: ({ row }) => (
        <div className={row.original.unpaidAmount === 0 ? 'text-[#22C55E]' : 'text-[#f00]'}>
          {row.original.unpaidAmount == 0 ? 'Paid' : 'Unpaid'}
        </div>
      )
    },
    {
      accessorKey: 'export',
      header: () => <p>Export</p>,
      cell: ({ row }) => {
        return <ExportCell row={row} />
      }
    }
  ]

  return { invoiceColumns }
}

function ExportCell({ row }: { row: any }) {
  const { data } = useSession()

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: any) => {
      return await requester({
        endpoint: INVOICES_ENDPOINTS.download,
        replace: { invoiceId: id },
        token: data?.user?.token,
        responseType: 'blob'
      })
    },
    onSuccess: (blob: any) => {
      try {
        const fileURL = window.URL.createObjectURL(blob)
        const alink = document.createElement('a')
        alink.href = fileURL
        alink.download = 'invoice.pdf'
        alink.click()
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <div className='flex justify-start cursor-pointer'>
      {isPending ? (
        <ClientIcon icon='eos-icons:loading' fontSize={24} className='text-primary' />
      ) : (
        <ClientIcon
          icon='heroicons:arrow-down-tray'
          fontSize={24}
          className='text-secondary-foreground'
          onClick={() => mutate(row.original.invoiceId)}
        />
      )}
    </div>
  )
}
