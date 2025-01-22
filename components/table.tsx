'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from './ui/button'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount?: number
  pageSize?: number
  // totalElements: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  // pageCount = 2,
  pageSize = 5
}: // totalElements
DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    // pageCount: pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    },
    initialState: { pagination: { pageSize } }
  })

  return (
    <>
      {/* <div className='flex justify-between'>
        <div className='flex items-center py-4'>
          <Input
            placeholder='Filter Invoice number...'
            value={(table.getColumn('provider')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('provider')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline'>Filters</Button>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>filters</h4>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div> */}

      <div className='rounded-md border bg-white overflow-hidden'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className='text-primary-foreground text-base font-medium'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className='even:bg-[#f9fafb] '>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='text-secondary-foreground text-base'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center py-10'>
                  <Image src='/no-data.svg' alt='' width={156} height={156} className='mx-auto' />
                  <p className='text-xl font-semibold text-[#b3b3b3]'>No Data Found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          className={` border-0 h-[30px] w-[30px] p-0 hover:text-white hover:bg-primary text-secondary-foreground ${
            !table.getCanPreviousPage() ? 'bg-white text-[#737373]' : 'bg-[#e3e8ec]'
          }`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <Icon icon='iconamoon:arrow-left-2-bold' fontSize={22} />
        </Button>
        {Array(table.getPageCount())
          .fill(0)
          .map((_, index) => (
            <Button
              key={index}
              className={`font-normal ${
                table.getState().pagination.pageIndex == index
                  ? 'border border-primary bg-primary text-white h-[30px] w-[30px]'
                  : 'bg-[#e3e8ec] h-[30px] w-[30px] text-secondary-foreground hover:text-white'
              }`}
              onClick={() => table.setPageIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        <Button
          variant='outline'
          size='sm'
          className={`bg-[#e3e8ec] border-0 h-[30px] w-[30px] p-0 text-secondary-foreground hover:text-white hover:bg-primary ${
            !table.getCanNextPage() ? 'bg-white text-[#737373]' : 'bg-[#e3e8ec]'
          }`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <Icon icon='iconamoon:arrow-right-2-bold' fontSize={22} />
        </Button>
      </div>
    </>
  )
}
