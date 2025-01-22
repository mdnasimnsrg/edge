'use client'
import { IPayment } from '@/@types/api/interfaces'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { INVOICES_ENDPOINTS } from '@/endpoints/invoices'
import { useRequester } from '@/hooks/useRequester'
import { requester } from '@/lib/requester'
import { formatDate } from '@/utils/formatDate'
import { useMutation } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export const transactionColumns: ColumnDef<IPayment>[] = [
  {
    accessorKey: 'targetInvoiceId',
    header: () => <p>Num</p>,
    cell: ({ row }) => {
      return <p>{row.original.paymentNumber}</p>
    }
  },
  {
    accessorKey: 'Invoice',
    header: () => <p>Invoice Details</p>,
    cell: ({ row }) => <ShowInvoiceDialog invoiceId={row.original.targetInvoiceId} />
  },
  {
    accessorKey: 'transactions[0].effectiveDate',
    header: () => <p>Time</p>,
    cell: ({ row }) => {
      return (
        <div className='flex gap-4'>
          <p>{moment(formatDate(row.original.transactions[0].effectiveDate)).format('DD MMM YY ')}</p>
          <p>{moment(formatDate(row.original.transactions[0].effectiveDate)).format('MM:HH A')}</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'Status',
    header: () => <p>Status</p>,
    cell: ({ row }) => (
      <Badge
        className={`${
          row.original.transactions[0].status == 'SUCCESS'
            ? 'bg-primary text-white'
            : 'bg-yellow-300 text-primary-foreground'
        }`}
      >
        {row.original.transactions[0].status}
      </Badge>
    )
  },
  {
    accessorKey: 'purchasedAmount',
    header: () => <p>Amount</p>,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.purchasedAmount} {row.original.currency}
        </div>
      )
    }
  }
]

function ShowInvoiceDialog({ invoiceId }: { invoiceId: string }) {
  const [open, setOpen] = useState(false)

  const { data: invoiceHTML, isPending: invoiceHTMLPending } = useRequester({
    endpoint: INVOICES_ENDPOINTS.getInvoiceHTML,
    replace: { invoiceId },
    options: { enabled: open, queryKey: ['invoiceHTML', invoiceId] }
  })

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
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>
        <p className='underline'>Invoice Details</p>
      </DialogTrigger>
      <DialogContent className='max-w-4xl'>
        <DialogTitle>Invoice Details</DialogTitle>
        <LoadingWrapper isLoading={invoiceHTMLPending}>
          {/* @ts-ignore */}
          <div dangerouslySetInnerHTML={{ __html: invoiceHTML }}></div>
        </LoadingWrapper>
        <DialogFooter>
          <Button
            onClick={() => mutate(invoiceId)}
            isLoading={isPending}
            disabled={isPending}
            className='min-w-[100px]'
          >
            Export as PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
