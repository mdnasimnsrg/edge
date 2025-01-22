import PageWrapper from '@/components/wrappers/page-wrapper'
import { Metadata } from 'next'
import { SubscriptionsPlans } from '../components'

export const metadata: Metadata = {
  title: 'Subscriptions'
}
export default function Subscriptions() {
  return (
    <PageWrapper
      breadcrumbs={[
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/subscriptions', label: 'Subscriptions' }
      ]}
    >
      <SubscriptionsPlans />
    </PageWrapper>
  )
}
