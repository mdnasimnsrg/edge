import { Endpoint } from '@/endpoints/types'
import { useRequester } from '@/hooks/useRequester'
import { useState } from 'react'
import { DataTable } from '../table'
import LoadingWrapper from './loading-wrapper'

export default function PaginatedDataTable<T>({ columns, endpoint }: { columns: any; endpoint: Endpoint }) {
  const [filters] = useState({
    pageNo: '0',
    pageSize: '10'
  })

  const { data, isLoading } = useRequester<T[]>({
    endpoint: endpoint,
    params: filters,
    options: { queryKey: [JSON.stringify(endpoint), `${JSON.stringify(filters)}`] }
  })

  return (
    <LoadingWrapper isLoading={isLoading}>
      {data && (
        <DataTable
          pageCount={2}
          columns={columns}
          data={data}
          // pageCount={data?.totalPages}
          // filters={filters}
          // setFilters={setFilters}
          // totalElements={data?.totalElements}
        />
      )}
    </LoadingWrapper>
  )
}
