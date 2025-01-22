import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function LoadingWrapper({
  isLoading,
  children,
  loadingEl,
  isEmpty
}: {
  isLoading: boolean
  children: React.ReactNode
  loadingEl?: React.ReactNode
  isEmpty?: boolean
}) {
  const Loader = loadingEl ? loadingEl : <LoadingSpinner />

  return (
    <>
      {isLoading ? (
        Loader
      ) : !isEmpty ? (
        children
      ) : (
        <div className='text-secondary-foreground h-full  flex items-center justify-center w-full '>
          <p>No Data</p>
        </div>
      )}
    </>
  )
}
