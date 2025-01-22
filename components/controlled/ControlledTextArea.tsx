import { Textarea } from '@/components/ui/textarea'
import { Controller } from 'react-hook-form'

export default function ControlledTextArea({
  name,
  control,
  label,
  placeholder,
  astrict
}: {
  name: string
  control: any
  label?: string
  placeholder?: string
  astrict?: boolean
}) {
  return (
    <Controller
      rules={{ required: { value: true, message: `${label} is required` } }}
      name={name}
      control={control}
      render={({ field, formState: { isSubmitting }, fieldState: { error } }) => {
        return (
          <div className='mb-1'>
            <p className='pb-1 text-sm font-medium'>
              {label && label} {astrict && <span className='text-base text-destructive'>*</span>}
            </p>
            <Textarea
              {...field}
              disabled={isSubmitting}
              placeholder={placeholder || label}
              className={error ? 'border border-destructive' : ''}
            />
            {error && <p className='text-xs text-destructive pt-1'>{error.message}</p>}
          </div>
        )
      }}
    />
  )
}
