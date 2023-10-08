"use client";

import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const links: Array<{ name: string, url: string }> = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Stats',
    url: '/statistics',
  },
  {
    name: 'Chat',
    url: '/chat',
  },
  {
    name: 'Games',
    url: '/games',
  },
]

const MobileNavbar = () => {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <nav className='md:hidden flex-center flex-col absolute w-full max-w-[100vw] px-5'>
      <div className='flex-between w-full pt-4'>
        <Image
          src="/assets/home/images/logo.png"
          className="self-start"
          width={150}
          height={150}
          alt="logo"
        />
        <Menu onClick={() => setMobileOpen(!mobileOpen)} />
      </div>

      <div className={`flex w-full z-50 self-start flex-col ${!mobileOpen && 'hidden'} bg-black-300/80 animate-in fade-in duration-250 h-screen`}>
        <div className='flex flex-col gap-10 bg-black-100 z-50 h-fit py-10'>
          {links.map((link: { name: string, url: string }, index: number) => (
            <Link onClick={() => setMobileOpen(false)} key={index} className={`${pathname === link.url ? 'text-primary border-b border-primary' : 'hover:text-white/80'} w-fit`} href={link.url}>{link.name}</Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default MobileNavbar
