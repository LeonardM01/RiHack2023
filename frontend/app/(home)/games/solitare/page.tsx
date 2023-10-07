import React from 'react'

const Solitare = () => {
  return (
    <main className='w-full h-full flex-center mt-10'>
      <iframe
        className='h-[650px] w-full overflow-hidden'
        src="https://cdn.htmlgames.com/SpikeSolitaire/"
        scrolling="no"
      >
      </iframe>
    </main>
  )
}

export default Solitare
