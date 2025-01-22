'use client'
import { ISubscription } from '@/@types/api/interfaces'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils/formatDate'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

export const subscriptionHistoryColumns: ColumnDef<ISubscription>[] = [
  {
    accessorKey: 'Num',
    header: () => <p>Num</p>,
    cell: ({ row }) => {
      return <>{row.original.id}</>
    }
  },
  {
    accessorKey: 'provider',
    header: () => <p>Provider</p>,
    cell: ({ row }) => <>{row.original.plan.product.name.replace('_', ' ')}</>
  },
  {
    accessorKey: 'plan',
    header: () => <p>Plan</p>,
    cell: ({ row }) => <>{row.original.plan.prettyName.replace('_', ' ')}</>
  },
  {
    accessorKey: 'Start',
    header: () => <p>Start Date</p>,
    cell: ({ row }) => {
      return (
        <p className='text-secondary-foreground'>{moment(formatDate(row.original.startDate)).format('DD MMM YYYY')}</p>
      )
    }
  },
  {
    accessorKey: 'End',
    header: () => <p>End Date</p>,
    cell: ({ row }) => {
      return (
        <p className='text-secondary-foreground'>
          {moment(formatDate(row.original.renewalDate)).format('DD MMM YYYY')}
        </p>
      )
    }
  },
  {
    accessorKey: 'amount',
    header: () => <p>Amount</p>,
    cell: ({ row }) => {
      return <p className='text-primary font-medium'>{row.original.plan.price} SAR</p>
    }
  },
  {
    accessorKey: 'Status',
    header: () => <p>Status</p>,
    cell: ({ row }) => {
      const getStatusBg = (status:string) =>{
        if(status=="ACTIVE") return "bg-primary text-white"
        if(status=="INACTIVE") return "bg-yellow-400 text-primary-foreground hover:bg-initial"
        if(status=="CANCELLED") return "bg-red-500 text-white hover:bg-initial"
      }

      return(
        <Badge
        className={getStatusBg(row.original.status)}
      >
        {row.original.status}
      </Badge>
      )
    }
  }
]
