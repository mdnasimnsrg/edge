export default function LoadingSpinner({ size = 32, color }: { size?: number; color?: string }) {
  return (
    <div className='flex justify-center items-center h-full w-full'>
      <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24' color={color}>
        <path
          fill={'#aeddd7'}
          d='M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z'
          opacity='.5'
        />
        <path fill={`#009e89`} d='M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z' className='text-primary'>
          <animateTransform
            attributeName='transform'
            dur='1s'
            from='0 12 12'
            repeatCount='indefinite'
            to='360 12 12'
            type='rotate'
          />
        </path>
      </svg>
    </div>
  )
}
