import { ArrowRight } from '@/components/icons/icons'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const sectionTitleVariant = cva('h-[46px] border-2 px-9 py-2 rounded-full text-lg font-medium flex gap-1', {
  variants: {
    variant: {
      default: 'border-primary-foreground [&>*:first-child]:text-primary',
      white: 'border-white text-white'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export function SectionTitle({ title, variant }: { title: string; variant?: 'default' | 'white' | null | undefined }) {
  return (
    <p className={cn(sectionTitleVariant({ variant }))}>
      <ArrowRight className='' />
      {title}
    </p>
  )
}
