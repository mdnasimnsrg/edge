export function Footer() {
  return (
    <div className='bg-white h-[50px] flex items-center justify-center shadow-custom text-secondary-foreground'>
      <span> {`${new Date().getFullYear()} ©`}</span> &nbsp;
      <span className='text-primary-foreground'>Khayyal</span>
    </div>
  )
}
