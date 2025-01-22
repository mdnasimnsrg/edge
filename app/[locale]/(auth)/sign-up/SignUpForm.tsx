'use client'
import ControlledCheckBox from '@/components/controlled/ControlledCheckBox'
import ControlledInput from '@/components/controlled/ControlledInput'
import ControlledSelect from '@/components/controlled/ControlledSelect'
import ControlledTextArea from '@/components/controlled/ControlledTextArea'
import { ClientIcon } from '@/components/ui/ClitentIcon'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { VALIDATION_REGEX } from '@/constants/validations'
import { AUTH_ENDPOINTS } from '@/endpoints/auth'
import { CONSUMER_ORGANIZATIONS_ENDPOINTS } from '@/endpoints/consumer-organizations'
import { USERS_ENDPOINT } from '@/endpoints/users'
import { useCheckAvailability } from '@/hooks/useCheckAvailability'
import { requester } from '@/lib/requester'
import { Link, useRouter } from '@/navigatios'
import { Icon } from '@iconify/react'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Stepper } from './Stepper'


export default function SignUpForm() {
  const locale = useLocale()
  const { toast } = useToast()
  const useFormReturn = useForm({ mode: 'onChange' })
  const { control, handleSubmit, trigger, watch, getValues } = useFormReturn
  const router = useRouter()


  const [step, setStep] = useState(1)

  

  const validationNames: any = {
    1: ['username', 'email', 'password', 'confirmPassword'],
    2: ['firstName', 'lastName', 'mobileNumber', 'nationalId'],
    3: [
      'consumerOrganization.nameEnglish',
      'consumerOrganization.nameArabic',
      'consumerOrganization.number',
      'industryType',
      'organizationType',
      'consumerOrganization.crNumber',
      'consumerOrganization.AddressEnglish',
      'consumerOrganization.AddressArabic',
      'consumerOrganization.vatNumber'
    ]
  }

  const handleChangeStep = async () => {
    const isValid = await trigger(validationNames[step], { shouldFocus: true })
    if (isValid) setStep(step + 1)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      await requester({ endpoint: AUTH_ENDPOINTS.register, options: { data: { ...data, status: 'active' } } })
    },
    onSuccess: () => {
      router.push('/login')
      toast({ title: 'Account created successfully', description: 'Please login', variant: 'success' })
    },
    onError: () => {
      toast({ title: 'Error in registration', variant: 'destructive' })
    }
  })

  const { loading: userNameLoading } = useCheckAvailability({
    name: 'username',
    endpoint: USERS_ENDPOINT.checkUsername,
    params: 'username',
    useFormReturn
  })

  const { loading: emailLoading } = useCheckAvailability({
    name: 'email',
    endpoint: USERS_ENDPOINT.checkEmail,
    params: 'email',
    useFormReturn
  })
  const { loading: organizationNameEnLoading } = useCheckAvailability({
    name: 'consumerOrganization.nameEnglish',
    endpoint: CONSUMER_ORGANIZATIONS_ENDPOINTS.checkName,
    params: 'organizationName',
    useFormReturn
  })

  return (
    <div className='flex flex-col justify-center items-center min-h-screen container py-24 '>
      <div className='w-full'>
        <p className='text-[28px] font-semibold text-[#002623] pb-6 self-start '>Create Account</p>
        <div className=' flex flex-col bg-white  shadow-md rounded-lg '>
          {step <= 4 && <Stepper step={step} />}
          <div className='overflow-hidden p-8'>
            {step == 1 && (
              <motion.div
                className='grid grid-cols-1 lg:grid-cols-2 gap-x-12'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ControlledInput
                  control={control}
                  label={'Username'}
                  astrict
                  name='username'
                  loading={userNameLoading}
                  rules={{
                    required: { value: true, message: 'required' },
                    min: { value: 3, message: 'Min 3 characters without spaces' },
                    max: { value: 20, message: 'Max 20 characters without spaces' },
                    pattern: { value: VALIDATION_REGEX.userName, message: 'Min 3 characters without spaces or underscores' }
                  }}
                />
                <ControlledInput
                  control={control}
                  label='User Email'
                  name='email'
                  astrict
                  loading={emailLoading}
                  rules={{
                    required: { value: true, message: 'required' },
                    pattern: { value: VALIDATION_REGEX.email, message: 'Enter valid email' }
                  }}
                />
                <ControlledInput
                  control={control}
                  astrict
                  label='Password'
                  name='password'
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
                  control={control}
                  astrict
                  label='Confirm Password'
                  name='confirmPassword'
                  isPassword
                  rules={{
                    required: { value: true, message: 'required' },
                    validate: (val: string) => {
                      if (watch('password') != val) {
                        return 'Your passwords do no match'
                      }
                    }
                  }}
                />
              </motion.div>
            )}
            {step == 2 && (
              <motion.div
                className='grid grid-cols-1 lg:grid-cols-2 gap-x-12'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <ControlledInput
                  control={control}
                  label='User First Name'
                  name='firstName'
                  astrict
                  rules={{
                    required: { value: true, message: 'required' },
                    min: { value: 3, message: 'Min 3 characters without spaces' },
                    max: { value: 20, message: 'Max 20 characters without spaces' }
                  }}
                />
                <ControlledInput
                  control={control}
                  label='User Last Name'
                  name='lastName'
                  astrict
                  rules={{
                    required: { value: true, message: 'required' },
                    min: { value: 3, message: 'Min 3 characters without spaces' },
                    max: { value: 20, message: 'Max 20 characters without spaces' }
                  }}
                />
                <ControlledInput
                    astrict
                    control={control}
                    label='User Mobile Number'
                    placeholder="XXXXXXXX"
                    name='mobileNumber'
                    type='number'
                    startText="+9665"
                    rules={{
                      required: { value: true, message: 'required' },
                      min: { value: 10000000 , message: "Enter valid phone number (8 numbers)" },
                      max: { value: 99999999, message: "Enter valid phone number (8 numbers)" },
                      minLength: { value: 8, message: "Enter valid phone number (8 numbers)" },
                      maxLength: { value: 8, message: "Enter valid phone number (8 numbers)" }
                    }}
                />
                <ControlledInput
                  astrict
                  control={control}
                  label='National Id/Iqama'
                  name='nationalId'
                  type='number'
                  rules={{
                    required: { value: true, message: 'required' },
                    min: { value: 1000000000, message: 'Enter valid Id/Iqama number (10 numbers)' },
                    max: { value: 9999999999, message: 'Enter valid Id/Iqama number (10 numbers)' },
                    minLength: { value: 10, message: 'Enter valid Id/Iqama number (10 numbers)' },
                    maxLength: { value: 10, message: 'Enter valid Id/Iqama number (10 numbers)' }
                  }}
                />
              </motion.div>
            )}
            {step == 3 && (
              <motion.div
                className='grid grid-cols-1 lg:grid-cols-2 gap-x-12'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ControlledInput
                  loading={organizationNameEnLoading}
                  astrict
                  control={control}
                  label='Organization Name En'
                  name='consumerOrganization.nameEnglish'
                  rules={{
                    pattern: { value: VALIDATION_REGEX.userName, message: 'Name without spaces or underscores' }
                  }}
                />
                <ControlledInput
                  astrict
                  control={control}
                  label='Organization Name Ar'
                  name='consumerOrganization.nameArabic'
                  rules={{
                    required: { value: true, message: 'This Field is required' }
                  }}
                />
                <ControlledInput
                  astrict
                  control={control}
                  label='Organization Phone Number'
                  placeholder='xxxxxxx'
                  name='consumerOrganization.number'
                  type='number'
                  startText='+9665'
                  rules={{
                    required: { value: true, message: 'required' },
                    min: { value: 10000000, message: 'Enter valid phone number (8 numbers)' },
                    max: { value: 99999999, message: 'Enter valid phone number (8 numbers)' },
                    minLength: { value: 8, message: 'Enter valid phone number (8 numbers)' },
                    maxLength: { value: 8, message: 'Enter valid phone number (8 numbers)' }
                  }}
                />
                <ControlledInput astrict control={control} label='Organization Type' name='organizationType' />
                <ControlledSelect
                  astrict
                  control={control}
                  label='Industry Type'
                  name='industryType'
                  items={[
                    { name: 'Education', value: 'Education' },
                    { name: 'Finance', value: 'Finance' }
                  ]}
                />
                <ControlledInput
                  astrict
                  control={control}
                  label='Commercial Registration Number (CR Number)'
                  name='consumerOrganization.crNumber'
                  type='number'
                  rules={{
                    required: { value: true, message: 'required' },
                    min: { value: 1000000000, message: 'Enter valid CR Number (10 numbers)' },
                    max: { value: 9999999999, message: 'Enter valid CR Number (10 numbers)' },
                    minLength: { value: 10, message: 'Enter valid CR Number (10 numbers)' },
                    maxLength: { value: 10, message: 'Enter valid CR Number (10 numbers)' }
                  }}
                />
                <ControlledTextArea
                  astrict
                  control={control}
                  label='Organization Address in English'
                  name='consumerOrganization.AddressEnglish'
                />
                <ControlledTextArea
                  astrict
                  control={control}
                  label='Organization Address in Arabic '
                  name='consumerOrganization.AddressArabic'
                />

                <ControlledInput
                  astrict
                  control={control}
                  label='Organization VAT Number'
                  name='consumerOrganization.vatNumber'
                  type='number'
                  rules={{
                    required: { value: true, message: 'required' },
                    min: { value: 100000000000000, message: 'Enter valid VAT Number (15 numbers)' },
                    max: { value: 999999999999999, message: 'Enter valid VAT Number (15 numbers)' },
                    minLength: { value: 15, message: 'Enter valid VAT Number (15 numbers)' },
                    maxLength: { value: 15, message: 'Enter valid VAT Number (15 numbers)' }
                  }}
                />
              </motion.div>
            )}
            {step == 4 && <ReviewStep values={getValues()} setStep={setStep} control={control} />}
            {step == 5 && (
              <div>
                <p className='text-primary font-semibold text-2xl pb-4 '>Account created successfully</p>
                <Link href={'/login'} className='underline'>
                  Go to login
                </Link>
              </div>
            )}
            <div className={`flex items-center pt-4 ${step > 1 ? 'justify-between' : 'justify-end'} `}>
              {step > 1 && step < 5 && (
                <Button variant='outline' className='w-[165px]' onClick={() => setStep(step - 1)}>
                  {locale == 'ar' ? (
                    <ClientIcon icon='fa6-solid:chevron-right' fontSize={14} className='mx-2' />
                  ) : (
                    <ClientIcon icon='fa6-solid:chevron-left' fontSize={14} className='mx-2' />
                  )}
                  Previous
                </Button>
              )}
              {step < 4 && (
                <Button onClick={handleChangeStep} className='w-[165px]'>
                  Next
                  {locale == 'ar' ? (
                    <ClientIcon icon='fa6-solid:chevron-left' fontSize={14} className='mx-2' />
                  ) : (
                    <ClientIcon icon='fa6-solid:chevron-right' fontSize={14} className='mx-2' />
                  )}
                </Button>
              )}
              {step == 4 && (
                <Button
                  onClick={handleSubmit((e: any) => mutate(e))}
                  disabled={!watch('agreeTerms') == true || isPending}
                  className='w-[165px]'
                >
                  {isPending ? <Icon icon='line-md:loading-twotone-loop' fontSize={24} /> : 'Submit'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReviewStep({
  values,
  setStep,
  control
}: {
  values: any
  setStep: Dispatch<SetStateAction<number>>
  control: any
}) {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-[22px] pb-5'>Review your Details and Submit</p>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 items-center text-lg font-medium'>
          Account Info
          <Button variant={'ghost'} className='text-primary' onClick={() => setStep(1)}>
            Edit
          </Button>
        </div>
        <div className='grid grid-cols-4'>
          {[
            { name: 'Username', value: values.username },
            { name: 'Email', value: values.email },
            { name: 'Password', value: '*******' }
          ].map(({ name, value }, index) => (
            <div key={index} className=' text-sm col-span-1'>
              <p>{name}</p>
              <p className='text-secondary-foreground'>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <hr className='my-2' />
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 items-center text-lg font-medium'>
          Personal Info
          <Button variant={'ghost'} className='text-primary' onClick={() => setStep(2)}>
            Edit
          </Button>
        </div>
        <div className='grid grid-cols-4'>
          {[
            { name: 'First Name', value: values.firstName },
            { name: 'Last Name', value: values.lastName },
            { name: 'Mobile Number', value: values.mobileNumber },
            { name: 'National ID / Iqama', value: values.nationalId }
          ].map(({ name, value }, index) => (
            <div key={index} className=' text-sm col-span-1'>
              <p>{name}</p>
              <p className='text-secondary-foreground'>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <hr className='my-2' />
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 items-center text-lg font-medium'>
          Organization Info
          <Button variant={'ghost'} className='text-primary' onClick={() => setStep(3)}>
            Edit
          </Button>
        </div>
        <div className='grid grid-cols-4 gap-[17px]'>
          {[
            { name: 'Organization Name En', value: values.consumerOrganization.nameEnglish },
            { name: 'Organization Name Ar', value: values.consumerOrganization.nameArabic },
            { name: 'Organization Number', value: values.consumerOrganization.number },
            { name: 'Organization Type', value: values.organizationType },
            { name: 'Industry Type', value: values.industryType },
            { name: 'CR Number', value: values.consumerOrganization.crNumber },
            { name: 'Organization Address in English', value: values.consumerOrganization.AddressEnglish },
            { name: 'Organization Address in Arabic', value: values.consumerOrganization.AddressArabic },
            { name: 'Organization VAT Number', value: values.consumerOrganization.vatNumber }
          ].map(({ name, value }, index) => (
            <div key={index} className=' text-sm col-span-1'>
              <p>{name}</p>
              <p className='text-secondary-foreground'>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='pt-5'>
        <ControlledCheckBox control={control} label='Organization VAT Number' name='agreeTerms' />
      </div>
    </div>
  )
}
