import { ClientIcon } from '@/components/ui/ClitentIcon'

export function ProductDetails() {
  return (
    <section className='h-[104px] bg-[#e6f6f4]'>
      <div className='container py-4 grid-cols-4 grid gap-4'>
        <DetailsCard title='Banks' description='Currently compatible with all German bank accounts' />
        <DetailsCard title='Type' description='B2B2C' />
        <DetailsCard title='Countries' description='EMEA (Germany)' />
        <DetailsCard title='Target' description='Groups - Retail - Sport - Mobility' />
      </div>
    </section>
  )
}

function DetailsCard({ title, description }: { title: string; description: string }) {
  return (
    <div className={`flex items-start gap-3  ${title !== 'Target' ? 'border-r border-dashed border-primary' : ''}`}>
      <div>
        <ClientIcon icon='fa-solid:check-circle' fontSize={24} className='text-primary' />
      </div>
      <div className='flex justify-start-start flex-col w-[226px]'>
        <h2 className='font-semibold'>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
