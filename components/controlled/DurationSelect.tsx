import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function DurationSelect({
  items,
  state,
  setState
}: {
  items: { name: string; value: string }[]
  state: string
  setState: any
}) {
  return (
    <>
      <Select value={state} onValueChange={setState}>
        <SelectTrigger className=' bg-[#e6f7f6] border-0 text-primary px-6 font-normal text-sm h-10 w-[132px]'>
          <SelectValue placeholder='Select ' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map(el => (
              <SelectItem value={el.value} key={el.value}>
                {el.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
