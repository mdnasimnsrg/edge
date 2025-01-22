import { ClientIcon } from '@/components/ui/ClitentIcon'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import CardWrapper from '@/components/wrappers/card-wrapper'
import PageWrapper from '@/components/wrappers/page-wrapper'

export default function settings() {
  return (
    <PageWrapper
      breadcrumbs={[
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/settings', label: 'Settings' }
      ]}
    >
      <CardWrapper title='Two factor authentication'>
        <p className='mb-10'>
          Two-factor authentication (2FA) can be used to help protect your account from unauthorized access. You’ll be
          required to enter a security code each time you sign in
        </p>
        <div className='flex items-center p-6 border w-[800px]'>
          <div>
            <div className='rounded-full bg-[#eeeff1] w-14 h-14 flex items-center justify-center'>
              <ClientIcon icon={'heroicons:envelope-20-solid'} className='text-[#adb4be] text-[32px]' />
            </div>
          </div>
          <div className='ms-6 me-12'>
            <p className='pb-1 font-medium'>Email For Two-Factor Authentication</p>
            <p className='text-[#696969]'>
              Use the security code sent to your email address as your two-factor authentication (2FA). The security
              code will be sent to the address associated with your account.
            </p>
          </div>
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Set Up</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='px-12 py-8'>
                <div className='flex flex-col w-full justify-center items-center'>
                  <p className='text-2xl font-medium pb-4 text-black'>Enter Security Code</p>
                  <p className='pb-8 text-black'>
                    To enable email authentication, please enter the security code we emailed to you.
                  </p>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup className='flex gap-4'>
                      <InputOTPSlot index={0} className='h-[60px] w-[46px] border' />
                      <InputOTPSlot index={1} className='h-[60px] w-[46px] border' />
                      <InputOTPSlot index={2} className='h-[60px] w-[46px] border' />
                      <InputOTPSlot index={3} className='h-[60px] w-[46px] border' />
                      <InputOTPSlot index={4} className='h-[60px] w-[46px] border' />
                      <InputOTPSlot index={5} className='h-[60px] w-[46px] border' />
                    </InputOTPGroup>
                  </InputOTP>
                  <p className='pt-6 pb-8 text-primary'>Resend Security Code</p>
                  <div className='flex flex-col gap-4 w-full'>
                    <Button className='w-full'>Enable Email Authentication</Button>
                    <AlertDialogCancel asChild>
                      <Button variant={'outline'} className='w-full'>
                        Cancel
                      </Button>
                    </AlertDialogCancel>
                  </div>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardWrapper>
    </PageWrapper>
  )
}
