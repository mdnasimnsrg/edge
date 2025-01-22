'use client'
import { IPayment } from '@/@types/api/interfaces'
import { DataTable } from '@/components/table'
import CardWrapper from '@/components/wrappers/card-wrapper'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import PageWrapper from '@/components/wrappers/page-wrapper'
import { CONSUMER_ORGANIZATIONS_ENDPOINTS } from '@/endpoints/consumer-organizations'
import { useRequester } from '@/hooks/useRequester'
import { transactionColumns } from './columns'

export default function TransactionPage() {
  const { data: transactions, isPending } = useRequester<IPayment[]>({
    endpoint: CONSUMER_ORGANIZATIONS_ENDPOINTS.getPayments
  })

  return (
    <PageWrapper
      breadcrumbs={[
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/transaction', label: 'Transactions' }
      ]}
    >
      <CardWrapper title='Transactions'>
        <LoadingWrapper isLoading={isPending}>
          {transactions && (
            <DataTable
              columns={transactionColumns}
              data={transactions}
              pageCount={Math.ceil(transactions.length / 10)}
            />
          )}
        </LoadingWrapper>
      </CardWrapper>
    </PageWrapper>
  )
}
