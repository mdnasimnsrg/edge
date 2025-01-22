'use client'
import { IPlan, ISubscription } from '@/@types/api/interfaces'
import ControlledInput from '@/components/controlled/ControlledInput'
import { queryClient } from '@/components/providers/query-client'
import { DataTable } from '@/components/table'
import { ClientIcon } from '@/components/ui/ClitentIcon'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
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
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import CardWrapper from '@/components/wrappers/card-wrapper'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
//import { ANALYTICS_ENDPOINTS } from '@/endpoints/analytics'
import { CONSUMER_ORGANIZATIONS_ENDPOINTS } from '@/endpoints/consumer-organizations'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { SUBSCRIPTION_ENDPOINT } from '@/endpoints/subscriptions'
import { useRequester } from '@/hooks/useRequester'
import { requester } from '@/lib/requester'
import { Link } from '@/navigatios'
import { formatDate } from '@/utils/formatDate'
import { formatUnderscoreString } from '@/utils/formatUnderscoreString'
import { useMutation } from '@tanstack/react-query'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PricingPlanCard, billingPeriods } from '../services/[id]/PlansTab'
import { subscriptionHistoryColumns } from './subscriptionHistoryColumns'

export function SubscriptionsPlans() {
  const { data: currentSubscriptions, isFetching } = useRequester<ISubscription[]>({
    endpoint: CONSUMER_ORGANIZATIONS_ENDPOINTS.getActiveSubscriptions,
    options: { queryKey: ['current-subscriptions'] }
  })

  const { data: subscriptionsHistory, isPending: isPendingHistory } = useRequester<ISubscription[]>({
    endpoint: CONSUMER_ORGANIZATIONS_ENDPOINTS.getSubscriptionHistory,
    options: { queryKey: ['subscriptionsHistory'] }
  })

  // const { data: totalCallsPerService } = useRequester<ITotalCallsPerService[]>({
  //   endpoint: ANALYTICS_ENDPOINTS.getTotalCallsPerProduct,
  //   options: { queryKey: ['totalCallsPerService'] }
  // })

  // const { data: topUsage } = useRequester<ITop_Usage>({
  //   endpoint: ANALYTICS_ENDPOINTS.getTopUsage
  // })

  return (
    <>
      <p className='text-xl font-medium pb-4'>Current Subscriptions</p>
      <div>
        <LoadingWrapper isLoading={isFetching} isEmpty={!currentSubscriptions?.length}>
          <div className='flex gap-[30px] flex-wrap'>
            {currentSubscriptions &&
              currentSubscriptions?.map(
                ({
                  id,
                  clientSecret,
                  clientId,
                  plan: {
                    icon,
                    name,
                    prettyName,
                    price,
                    billingPeriod,
                    planType,
                    currency,
                    usage,
                    product: { name: productName, id: productId }
                  },
                  renewalDate,
                  status,
                  startDate
                }) => {
                  return (
                    <div className='w-[350px] bg-white p-4 rounded-lg shadow-custom' key={id}>
                      <div className='flex gap-4 items-center'>
                        <div className='w-[72px] h-[72px] flex items-center justify-center'>
                          <img src={icon} width={60} height={60} alt='' />
                        </div>
                        <div className='flex flex-col justify-between h-[72px] flex-1'>
                          <div className='flex justify-between w-full'>
                            <Link href={`/dashboard/services/${productId}`}>
                              <p className='font-semibold'>{productName}</p>
                            </Link>
                            <Popover>
                              <PopoverTrigger>
                                <ClientIcon icon='heroicons:ellipsis-vertical-16-solid' fontSize={22} />
                              </PopoverTrigger>
                              <PopoverContent className='w-full flex flex-col gap-4'>
                                <CancelButton id={id} planName={name} isDisabled={status!=="ACTIVE"} />
                                <DowngradeButton
                                  productId={productId}
                                  currentPrice={price}
                                  currentSubscriptionId={`${id}`}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <p className='text-primary'>{prettyName.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <div className='border-t border-b my-4'>
                        {[
                          {
                            name: 'Price',
                            value:
                              planType.name !== 'USAGE BASED'
                                ? `${price} ${currency} ${billingPeriods[billingPeriod]}`
                                : `${price} ${currency} per Call`
                          },
                          {
                            name: 'Remain',
                            value: `${moment(formatDate(renewalDate) as string).diff(moment(new Date()), 'days')} Days`
                          },
                          {
                            name: 'Start',
                            value: moment(formatDate(startDate) as string).format('D MMM YYYY')
                          },
                          {
                            name: 'End',
                            value: moment(formatDate(renewalDate) as string).format('D MMM YYYY')
                          },
                          {
                            name: 'Calls Usage',
                            value:usage
                          }
                        ].map(({ name, value }, index) => (
                          <div className='flex items-center gap-6 h-12 border-b' key={index}>
                            <p className='text-black w-[11ch]'>{name}</p>
                            <p className='text-secondary-foreground'>{value}</p>
                          </div>
                        ))}

                        <div className='flex items-center gap-6 h-12'>
                          <p className='text-black'>Auto Renew</p>
                          <p>
                          <Switch checked={status==="ACTIVE"?true:false} disabled />
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-end gap-4'>
                        <ShowKeyDialog clientSecret={clientSecret} clientId={clientId} />
                        <UpgradeButton productId={productId} currentPrice={price} currentSubscriptionId={`${id}`} />
                      </div>
                    </div>
                  )
                }
              )}
          </div>
        </LoadingWrapper>
      </div>
      {/* <p className='text-xl font-medium pb-4 mt-[30px]'>InActive Subscriptions</p>
      <div>
        <LoadingWrapper isLoading={isFetching} isEmpty={!inActiveSubscriptions?.length}>
          <div className='flex gap-[30px] flex-wrap'>
            {inActiveSubscriptions &&
              inActiveSubscriptions?.map(
                ({
                  id,
                  clientSecret,
                  clientId,
                  plan: {
                    icon,
                    name,
                    price,
                    billing,
                    currency,
                    billingPeriod,
                    product: { name: productName, id: productId }
                  },
                  renewalDate,
                  startDate
                }) => {
                  return (
                    <div className='w-[350px] bg-white p-4 rounded-lg shadow-custom' key={id}>
                      <div className='flex gap-4 items-center'>
                        <div className='w-[72px] h-[72px] flex items-center justify-center'>
                          <img src={icon} width={60} height={60} alt='' />
                        </div>
                        <div className='flex flex-col justify-between h-[72px] flex-1'>
                          <div className='flex justify-between w-full'>
                            <Link href={`/dashboard/services/${productId}`}>
                              <p className='font-semibold'>{productName}</p>
                            </Link>
                          </div>
                          <p className='text-primary'>{name.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <div className='border-t border-b my-4'>
                        {[
                          {
                            name: 'Price',
                            value:
                              billing == 'REQUIRING'
                                ? `${price} ${currency} ${billingPeriods[billingPeriod]}`
                                : `${price} ${currency} per Call`
                          },
                          {
                            name: 'Remain',
                            value: `${moment(formatDate(renewalDate) as string).diff(moment(new Date()), 'days')} Days`
                          },
                          {
                            name: 'Start',
                            value: moment(formatDate(startDate) as string).format('D MMM YYYY')
                          },
                          {
                            name: 'End',
                            value: moment(formatDate(renewalDate) as string).format('D MMM YYYY')
                          }
                          // {
                          //   name: 'Calls Usage',
                          //   value: totalCallsPerService?.filter(({ productName: name }) => name === productName)[0]
                          //     ?.totalCall
                          // }
                        ].map(({ name, value }, index) => (
                          <div className='flex items-center gap-6 h-12 border-b' key={index}>
                            <p className='text-black w-[11ch]'>{name}</p>
                            <p className='text-secondary-foreground'>{value}</p>
                          </div>
                        ))}
                      </div>
                      <div className='flex justify-end gap-4'>
                        <ShowKeyDialog clientSecret={clientSecret} clientId={clientId} />
                        <UpgradeButton productId={productId} currentPrice={price} currentSubscriptionId={`${id}`} />
                      </div>
                    </div>
                  )
                }
              )}
          </div>
        </LoadingWrapper>
      </div> */}
      <CardWrapper title='Subscriptions History' className='mt-[30px]'>
        <LoadingWrapper isLoading={isPendingHistory}>
          <DataTable columns={subscriptionHistoryColumns} data={subscriptionsHistory || []} />
        </LoadingWrapper>
      </CardWrapper>
    </>
  )
}

function CancelButton({ id, planName,isDisabled }: { id: number; planName: string,isDisabled:boolean }) {
  const { data: user } = useSession()
  const { toast } = useToast()
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: any) =>
      requester({
        endpoint: SUBSCRIPTION_ENDPOINT.unsubscribe,
        replace: { subscriptionId: id },
        token: user?.user.token
      }),
    onError: () => {
      toast({ variant: 'destructive', title: 'Something went wrong' })
    },
    onSuccess: () => {
      toast({ variant: 'success', title: 'Cancelled Successfully' })
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
      queryClient.invalidateQueries({ queryKey: ['subscriptionsHistory'] })
    }
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isDisabled}
          variant={'outline'}
          className='border-destructive text-destructive hover:text-destructive text-sm w-full'
        >
          Cancel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[455px] px-6'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-2xl font-medium'>
            Cancel {formatUnderscoreString(planName)}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-base text-[#696969] mt-4'>
            canceling Subscription will make your account lose this plan. Are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='w-full pt-12'>
          <div className='flex flex-col w-full gap-4'>
            <Button variant={'destructive'} className='w-full' onClick={() => mutate(id)} disabled={isPending}>
              {isPending ? <LoadingSpinner color='#00665c' /> : 'Cancel'}
            </Button>
            <AlertDialogCancel disabled={isPending} className='w-full'>
              Back
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function UpgradeButton({
  productId,
  currentPrice,
  currentSubscriptionId
}: {
  productId: number
  currentPrice: number
  currentSubscriptionId: string
}) {
  const { data: plans } = useRequester<IPlan[]>({
    endpoint: PRODUCTS_ENDPOINT.getPlans,
    replace: { productId: String(productId) }
  })
  const [open, setOpen] = useState(false)

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>
        <Button className='text-sm w-full'>Upgrade</Button>
      </DialogTrigger>
      <DialogContent className='max-w-5xl'>
        <DialogTitle>Choose your Favorite plan</DialogTitle>
        <ScrollArea className='h-[calc(100vh-200px)]'>
          <div className='grid grid-cols-3 gap-6 justify-center w-full'>
            {plans &&
              plans
                .filter(({ price }) => price > currentPrice)
                .sort((a, b) => a.price - b.price)
                .map((plan, index) => (
                  <PricingPlanCard
                    plan={plan}
                    key={index}
                    isUpgrade
                    isChange
                    currentSubscriptionId={currentSubscriptionId}
                    setOpen={setOpen}
                  />
                ))}
          </div>
        </ScrollArea>
        <DialogClose asChild>
          <Button variant={'outline'} className='w-full'>
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

function DowngradeButton({
  productId,
  currentPrice,
  currentSubscriptionId
}: {
  productId: number
  currentPrice: number
  currentSubscriptionId: string
}) {
  const { data: plans } = useRequester<IPlan[]>({
    endpoint: PRODUCTS_ENDPOINT.getPlans,
    replace: { productId: String(productId) }
  })

  const [open, setOpen] = useState(false)

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>
        <Button variant={'outline'} className='text-sm w-full'>
          Downgrade
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-5xl'>
        <DialogTitle>Choose your Favorite plan</DialogTitle>
        <ScrollArea className='h-[calc(100vh-200px)]'>
          <div className='flex justify-start gap-6 items-start w-full'>
            {plans &&
              plans
                .filter(({ price }) => price < currentPrice)
                .map((plan, index) => (
                  <PricingPlanCard
                    plan={plan}
                    key={index}
                    isChange
                    isDowngrade
                    setOpen={setOpen}
                    currentSubscriptionId={currentSubscriptionId}
                  />
                ))}
          </div>
        </ScrollArea>
        <DialogClose asChild>
          <Button variant={'outline'} className='w-full'>
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

function ShowKeyDialog({ clientSecret, clientId }: { clientSecret: string; clientId: string }) {
  const { control } = useForm({ defaultValues: { clientSecret, clientId } })

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'} className='text-sm w-full'>
          Show Key
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>API KEY Successfully Created </DialogTitle>
        <p className='text-base font-normal pb-3'>
          This is your unique API key and it is non-recoverable. if you lose this API key, you will have to reset it.
        </p>
        <div className='flex flex-col gap-0'>
          <ControlledInput control={control} name='clientId' label='API KEY' isPassword />
          <ControlledInput control={control} name='clientSecret' label='Secret key' isPassword />
        </div>
      </DialogContent>
    </Dialog>
  )
}
