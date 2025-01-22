import PageWrapper from '@/components/wrappers/page-wrapper'
import {
  Expenses,
  Invoices,
  LastTransaction,
  SpendingPerService,
  TotalCallsPerService,
  UpcomingRenewals
} from './components'

export default async function Dashboard() {
  return (
    <PageWrapper className='grid grid-cols-12 gap-[30px] '>
      <TotalCallsPerService />
      <SpendingPerService />
      <Expenses />
      <UpcomingRenewals />
      <LastTransaction />
      <Invoices />
    </PageWrapper>
  )
}
