'use client'
import { IProfile } from '@/@types/api/interfaces'
import ControlledInput from '@/components/controlled/ControlledInput'
import ControlledTextArea from '@/components/controlled/ControlledTextArea'
import { queryClient } from '@/components/providers/query-client'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import CardWrapper from '@/components/wrappers/card-wrapper'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import PageWrapper from '@/components/wrappers/page-wrapper'
import { VALIDATION_REGEX } from '@/constants/validations'
import { USERS_ENDPOINT } from '@/endpoints/users'
import { useRequester } from '@/hooks/useRequester'
import { requester } from '@/lib/requester'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

export default function Profile() {
  const { data: user } = useSession()
  const { toast } = useToast()
  const { data: userProfile, isFetching } = useRequester<IProfile>({
    endpoint: USERS_ENDPOINT.getProfile,
    options: { queryKey: ['userProfile'] }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      await requester({
        endpoint: USERS_ENDPOINT.updateProfile,
        options: { data: { ...userProfile, ...data } },
        token: user?.user.token
      })
    },
    onSuccess: () => {
      toast({ title: 'Profile updated successfully', variant: 'success' })
    }
  })
  const { mutate: updatePassword, isPending: updatePasswordPending } = useMutation({
    mutationFn: async (data: any) => {
      await requester({
        endpoint: USERS_ENDPOINT.updatePassword,
        options: { data: { oldPassword: data.oldPassword, newPassword: data.newPassword } },
        token: user?.user.token
      })
    },
    onSuccess: () => {
      toast({ title: 'Password updated successfully', variant: 'success' })
    }
  })

  const { mutate: updatePhoto, isPending: updatePhotoPending } = useMutation({
    mutationFn: async (e: any) => {
      const formData = new FormData()
      formData.append('file', e)
      await requester({ endpoint: USERS_ENDPOINT.updatePhoto, options: { data: formData }, token: user?.user.token })
      toast({ title: 'Photo updated successfully', variant: 'success' })
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    }
  })

  const { control: controlPersonalInfo, handleSubmit: handleSubmitPersonalInfo } = useForm({ values: userProfile })
  const { control: controlChangePassword, handleSubmit: handleSubmitPassword } = useForm({})
  const { control: controlOrganizationInfo, handleSubmit: handleSubmitOrganizationInfo } = useForm({
    values: userProfile
  })

  return (
    <PageWrapper
      breadcrumbs={[
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/profile', label: 'Profile' }
      ]}
    >
      <CardWrapper className='py-5 px-6'>
        <div className='flex  h-full justify-between items-center'>
          <div className='flex gap-4 h-full '>
            {isFetching ? (
              <>
                <div className='rounded-full shadow-md border-[2px] border-white overflow-hidden w-fit h-fit'>
                  <Skeleton className='h-[88px] w-[88px]' />
                </div>
                <div className='flex flex-col justify-between h-[88px]'>
                  <Skeleton className='h-[28px] w-[160px]' />
                  <Skeleton className='h-[22px] w-[200px]' />
                  <Skeleton className='h-[22px] w-[200px]' />
                </div>
              </>
            ) : (
              <>
                <div className='rounded-full shadow-md border-[2px] border-white overflow-hidden  '>
                  <img src={userProfile?.avatar} alt='avatar' className='object-cover w-[88px] h-[88px]' />
                </div>
                <div className='flex flex-col justify-between h-[88px] '>
                  <p className='text-xl font-bold text-[#384D6C]'>
                    {userProfile?.firstName} {userProfile?.lastName}
                  </p>
                  <p className='text-secondary-foreground'>{userProfile?.consumerOrganization.nameEnglish}</p>
                  <p className='text-secondary-foreground'>{userProfile?.email}</p>
                </div>
              </>
            )}
          </div>
          <label
            htmlFor='fileUpload'
            className={`bg-primary hover:bg-primary/70 text-white font-medium py-2 px-4 rounded  ${
              updatePhotoPending ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {updatePhotoPending ? <LoadingSpinner /> : 'Update photo'}
          </label>
          <input type='file' id='fileUpload' hidden onChange={(e: any) => updatePhoto(e.target.files[0])} />
        </div>
      </CardWrapper>
      <hr className='w-full mt-[49px] mb-[39px] h-[1px] bg-[#BFBFBF]' />
      <LoadingWrapper isLoading={isFetching}>
        <CardWrapper title='Personal Info'>
          <div className='grid grid-cols-2 gap-x-16 gap-y-0'>
            <ControlledInput control={controlPersonalInfo} name='firstName' label='First Name' />
            <ControlledInput control={controlPersonalInfo} name='lastName' label='Last Name' />
            <ControlledInput control={controlPersonalInfo} name='username' label='Username' disabled />
            <ControlledInput control={controlPersonalInfo} name='email' label='Email' disabled />
            <ControlledInput
              control={controlPersonalInfo}
              label='User Mobile Number'
              name='mobileNumber'
              type='number'
              startText='+9665'
              disabled
            />
            <ControlledInput control={controlPersonalInfo} name='nationalId' label='National Id' disabled />
          </div>
          <div className='gap-4 flex justify-end'>
            {/* <Button variant={'outline'} className='w-[160px]'>
              Delete
            </Button> */}
            <Button
              className='w-[160px]'
              onClick={handleSubmitPersonalInfo((data: any) => mutate(data))}
              isLoading={isPending}
              disabled={isPending}
            >
              Edit
            </Button>
          </div>
        </CardWrapper>
        <CardWrapper title='Change Password' className='mt-9'>
          <div className='grid grid-cols-2 gap-x-16 gap-y-0'>
            <ControlledInput control={controlChangePassword} name='oldPassword' label='Current Password' isPassword />
            <div></div>
            <ControlledInput
              control={controlChangePassword}
              name='newPassword'
              label='New Password'
              isPassword
              rules={{
                required: { value: true, message: 'required' },
                pattern: {
                  value: VALIDATION_REGEX.password,
                  message: 'Minimum 8 characters, at least 1 uppercase letter, 1 special character, 1 number'
                }
              }}
            />
            <ControlledInput
              control={controlChangePassword}
              name='confirmNewPassword'
              label='Confirm Password'
              isPassword
              rules={{
                required: { value: true, message: 'required' },
                pattern: {
                  value: VALIDATION_REGEX.password,
                  message: 'Minimum 8 characters, at least 1 uppercase letter, 1 special character, 1 number'
                }
              }}
            />
          </div>
          <div className='gap-4 flex justify-end'>
            {/* <Button variant={'outline'} className='w-[160px]'>
              Delete
            </Button> */}
            <Button
              className='w-[160px]'
              onClick={handleSubmitPassword(data => updatePassword(data))}
              isLoading={updatePasswordPending}
              disabled={updatePasswordPending}
            >
              Edit
            </Button>
          </div>
        </CardWrapper>
        <CardWrapper title='Organization Info' className='mt-9'>
          <div className='grid grid-cols-2 gap-x-16 gap-y-0'>
            <ControlledInput
              control={controlOrganizationInfo}
              name='consumerOrganization.nameEnglish'
              label='Organization Name En'
            />
            <ControlledInput
              control={controlOrganizationInfo}
              name='consumerOrganization.nameArabic'
              label='Organization Name Ar'
            />
            <ControlledInput
              control={controlOrganizationInfo}
              name='consumerOrganization.number'
              label='Organization Phone'
              type='number'
              startText='+9665'
            />
            <ControlledInput
              control={controlOrganizationInfo}
              name='consumerOrganization.vatNumber'
              label='Organization VAT Number'
            />
            <ControlledInput control={controlOrganizationInfo} name='consumerOrganization.null' label='Industry Type' />
            <ControlledInput
              control={controlOrganizationInfo}
              name='consumerOrganization.null'
              label='Organization Type'
            />
            <ControlledTextArea
              control={controlOrganizationInfo}
              name='consumerOrganization.null'
              label='Organization Address in English'
            />
            <ControlledTextArea
              control={controlOrganizationInfo}
              name='consumerOrganization.null'
              label='Organization Address in Arabic'
            />
            <ControlledInput
              control={controlOrganizationInfo}
              name='consumerOrganization.crNumber'
              label='Commercial Registration Number (CR Number)'
            />
          </div>
          <div className='gap-4 flex justify-end pt-4'>
            {/* <Button variant={'outline'} className='w-[160px]'>
              Delete
            </Button> */}
            <Button
              className='w-[160px]'
              onClick={handleSubmitOrganizationInfo((data: any) => mutate(data))}
              isLoading={isPending}
              disabled={isPending}
            >
              Edit
            </Button>
          </div>
        </CardWrapper>
      </LoadingWrapper>
    </PageWrapper>
  )
}
