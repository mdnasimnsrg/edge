'use client'
import { Button } from '@/components/ui/button'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import PageWrapper from '@/components/wrappers/page-wrapper'
import { INVOICES_ENDPOINTS } from '@/endpoints/invoices'
import { useRequester } from '@/hooks/useRequester'
import { requester } from '@/lib/requester'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export default function AccountInvoices({ params: { invoiceId } }: { params: { invoiceId: string } }) {
  const { data } = useSession()

  const { data: invoiceHTML, isPending: invoiceHTMLPending } = useRequester<any>({
    endpoint: INVOICES_ENDPOINTS.getInvoiceHTML,
    replace: { invoiceId },
    options: { queryKey: ['invoiceHTML', invoiceId] }
  })

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
    <PageWrapper
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Invoices', href: '/dashboard/invoices' },
        { label: `${invoiceId}`, href: `/dashboard/invoices/${invoiceId}` }
      ]}
    >
      <LoadingWrapper isLoading={invoiceHTMLPending}>
        <div className='flex flex-col items-center justify-end gap-[30px] '>
          <main className='bg-white p-2 w-[700px]  h-screen' dangerouslySetInnerHTML={{ __html: invoiceHTML }} />
          <Button
            onClick={() => mutate(invoiceId)}
            isLoading={isPending}
            disabled={isPending}
            className='min-w-[100px]'
          >
            Export as PDF
          </Button>
        </div>
      </LoadingWrapper>
    </PageWrapper>
  )
}
