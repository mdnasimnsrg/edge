import { IPlan } from '@/@types/api/interfaces'
import { queryClient } from '@/components/providers/query-client'
import { ClientIcon } from '@/components/ui/ClitentIcon'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { SUBSCRIPTION_ENDPOINT } from '@/endpoints/subscriptions'
import { requester } from '@/lib/requester'
import { formatUnderscoreString } from '@/utils/formatUnderscoreString'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export function ConfirmSubscriptionDialog({
  plan,
  isChange,
  isUpgrade,
  isDowngrade,
  currentSubscriptionId,
  setOpen,
  billingPeriod,
  hasOneSubscription
}: {
  plan: IPlan
  isChange?: boolean
  isUpgrade?: boolean
  isDowngrade?: boolean
  currentSubscriptionId?: string
  setOpen?: any
  billingPeriod:string
  hasOneSubscription?: boolean
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { subscribed, id, name } = plan

  const { data: user } = useSession()
  const { toast } = useToast()

  const message = {
    isUpgrade: 'Upgrade Successfully',
    isDowngrade: 'Downgrade Successfully',
    isSubscripted: 'Subscribed Successfully'
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: any) => {
      isChange && currentSubscriptionId
        ? await requester({
            endpoint: SUBSCRIPTION_ENDPOINT.changePlan,
            options: { data: { planId: id, startDate: '2024-04-23' } },
            replace: { currentSubscriptionId },
            token: user?.user.token
          })
        : await requester({
            endpoint: SUBSCRIPTION_ENDPOINT.subscribe,
            options: { data: { planId: id, startDate: '2024-04-23' } },
            token: user?.user.token
          })
    },
    onSuccess: () => {
      toast({
        title: message[isUpgrade ? 'isUpgrade' : isDowngrade ? 'isDowngrade' : 'isSubscripted'],
        variant: 'success'
      })
      setOpen && setOpen(false)
      queryClient.invalidateQueries({
        queryKey: ['dashboardPlans']
      })
      queryClient.invalidateQueries({
        queryKey: ['subscriptions']
      })
      queryClient.invalidateQueries({
        queryKey: ['subscriptionsHistory']
      })
      queryClient.invalidateQueries({
        queryKey: ['totalCallsPerService']
      })
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Something went wrong' })
    },
    onSettled: () => {
      setDialogOpen(false)
    }
  })

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button className={`w-full ${subscribed?"bg-secondary":""}`} disabled={subscribed || isPending || hasOneSubscription}>
          {subscribed && <ClientIcon icon='fa-solid:check-circle' className='me-2' />}
          {subscribed ? 'Subscribed' : isUpgrade ? 'Upgrade' : isDowngrade ? 'Downgrade' : 'Subscribe'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[455px] px-6'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-2xl font-medium'>
            Subscribe to {formatUnderscoreString(name)}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-base text-[#696969] mt-4'>
            Subscribe to {formatUnderscoreString(name)}. this subscription will automatically renew {billingPeriod.toLowerCase()}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='w-full pt-12'>
          <div className='flex flex-col w-full gap-4'>
            <Button className='w-full' onClick={() => mutate(id)} isLoading={isPending} disabled={isPending}>
              Subscribe
            </Button>
            <AlertDialogCancel className='w-full'>Back</AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
