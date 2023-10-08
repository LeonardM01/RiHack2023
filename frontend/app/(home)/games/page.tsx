import MapCard from '@/components/general/MapCard'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Games = () => {
  return (
    <main className='w-full h-full flex mt-16 md:mt-10 flex-wrap gap-10'>
      <Link href="/games/checkers" className="w-full md:max-w-[425px]">
        <Card className='bg-black-300 border-0 text-white px-2 py-4'>
          <CardTitle className='px-5'>
            Checkers
          </CardTitle>
          <CardDescription className='pt-2 px-5'>
            Games serve as a great distraction
          </CardDescription>
          <CardContent className="flex-center px-0 pt-4">
            <Image
              src="/assets/games/images/checker-board.png"
              width={250}
              height={250}
              alt="checkers"
            />
          </CardContent>
        </Card>
      </Link>

      <Link href="/games/chess" className="w-full md:max-w-[425px]">
        <Card className='bg-black-300 border-0 text-white px-2 py-4'>
          <CardTitle className='px-5'>
            Chess
          </CardTitle>
          <CardDescription className='pt-2 px-5'>
            Games serve as a great distraction
          </CardDescription>
          <CardContent className="flex-center px-0 pt-4">
            <Image
              src="/assets/games/images/chess-board.png"
              width={250}
              height={250}
              alt="checkers"
            />
          </CardContent>
        </Card>
      </Link>

      <Link href="/games/solitare" className="w-full md:max-w-[425px]">
        <Card className='bg-black-300 border-0 text-white px-2 py-4'>
          <CardTitle className='px-5'>
            Solitare
          </CardTitle>
          <CardDescription className='pt-2 px-5'>
            Games serve as a great distraction
          </CardDescription>
          <CardContent className="flex-center px-0 pt-4">
            <Image
              src="/assets/games/images/solitare.png"
              width={250}
              height={250}
              alt="checkers"
            />
          </CardContent>
        </Card>
      </Link>

      <MapCard />
    </main>
  )
}

export default Games
