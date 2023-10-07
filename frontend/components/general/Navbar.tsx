'use client';

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

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
]

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex-between max-w-8xl mx-auto py-8 w-full max-3xl:px-5">
      <div className="flex body-regular gap-10">
        <Image
          src="/assets/general/images/logo.png"
          className="self-start"
          width={50}
          height={30}
          alt="logo"
        />
        <ul className="flex-center gap-10 pl-24">
          {links.map((link: { name: string, url: string }) => (
            <li>
              <Link className={`${pathname === link.url && 'text-primary'}`} href="/">{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-center gap-10 self-end">
        <Link className="" href="/login">Log In</Link>
        <Link className="bg-primary px-5 py-3 rounded-md" href="/sign-up">Sign Up</Link>
      </div>
    </nav>
  )
}

export default Navbar
