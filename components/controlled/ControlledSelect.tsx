import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Controller } from 'react-hook-form'

export default function ControlledSelect({
  name,
  control,
  label,
  items,
  astrict
}: {
  name: string
  control: any
  label: string
  items: { name: string; value: string }[]
  astrict?: boolean
}) {
  return (
    <Controller
      rules={{ required: { value: true, message: `${label} is required` } }}
      name={name}
      control={control}
      render={({ field, formState: { isSubmitting }, fieldState: { error } }) => {
        return (
          <div>
            <p className='pb-1 text-sm font-medium'>
              {label} {astrict && <span className='text-base text-destructive'>*</span>}
            </p>
            <Select onValueChange={field.onChange} disabled={isSubmitting}>
              <SelectTrigger className={`w-full  ${error ? 'border border-destructive' : ''}`}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {items.map(({ name, value }, index) => (
                  <SelectItem value={value} key={index}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className='text-xs text-destructive pt-1'>{error.message}</p>}
          </div>
        )
      }}
    />
  )
}
