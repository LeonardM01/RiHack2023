import React from 'react'

const Chess = () => {
  return (
    <main className='w-full h-full flex-center mt-10'>
      <iframe
        className='h-[650px] w-full overflow-hidden'
        src="https://playpager.com/embed/chess/index.html"
        scrolling="no"
      >
      </iframe>
    </main>
  )
}

export default Chess
