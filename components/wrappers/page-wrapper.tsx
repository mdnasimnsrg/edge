import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { Link } from '@/navigatios'

export default function PageWrapper({
  title,
  children,
  breadcrumbs,
  className
}: {
  title?: string
  children: React.ReactNode
  breadcrumbs?: { href: string; label: string | undefined }[]
  className?: string
}) {
  return (
    <main>
      {breadcrumbs && (
        <Breadcrumb className='px-10 pt-5'>
          <BreadcrumbList>
            {breadcrumbs?.map((breadcrumb, index) => (
              <>
                {index + 1 < breadcrumbs.length && (
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                {index + 1 !== breadcrumbs.length && <BreadcrumbSeparator />}
                {index + 1 == breadcrumbs.length && (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      {/* {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />} */}
      {title && <p className='text-2xl font-medium text-primary pb-4'>{title}</p>}
      <div className={cn('px-10 pt-6 pb-20', className)}>{children}</div>
    </main>
  )
}
