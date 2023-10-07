'use client';

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider';

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

  const { user } = useContext(AuthContext);

  return (
    <nav className="flex-between max-w-8xl mx-auto py-8 w-full">
      <div className="flex body-regular gap-10">
        <Image
          src="/assets/general/images/logo.png"
          className="self-start"
          width={50}
          height={30}
          alt="logo"
        />
        <div className="flex-center gap-10 pl-24">
          {links.map((link: { name: string, url: string }, index: number) => (
            <Link key={index} className={`${pathname === link.url ? 'text-primary border-b border-primary' : 'hover:text-white/80'}`} href={link.url}>{link.name}</Link>
          ))}
        </div>
      </div>


      {!user ? (
        <div className="flex-center gap-10 self-end">
          <Link className="" href="/login">Log In</Link>
          <Link className="bg-primary px-5 py-3 rounded-md" href="/sign-up">Sign Up</Link>
        </div>
      ) : (
        <div className="flex-center gap-10 self-end">
          <Link href={`/profile/${user.id}`}>
            <Image
              src={user.avatar || '/assets/general/icons/user-green.svg'}
              className="rounded-full"
              width={48}
              height={48}
              alt="user"
            />
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
