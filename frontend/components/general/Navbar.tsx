'use client';

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider';
import { Skeleton } from '../ui/skeleton';

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

const Navbar = () => {
  const pathname = usePathname();

  const { user, isLoading } = useContext(AuthContext);

  return (
    <nav className="flex-between max-w-8xl mx-auto py-8 w-full">
      <div className="flex body-regular gap-10">
        <Image
          src="/assets/home/images/logo.png"
          className="self-start"
          width={150}
          height={150}
          alt="logo"
        />
        <div className="flex-center gap-10 pl-24">
          {links.map((link: { name: string, url: string }, index: number) => (
            <Link key={index} className={`${pathname === link.url ? 'text-primary border-b border-primary' : 'hover:text-white/80'}`} href={link.url}>{link.name}</Link>
          ))}
        </div>
      </div>


      {!isLoading ? (
        <>
          {!user ? (
            <div className="flex-center gap-10 self-end">
              <Link className="" href="/login">Log In</Link>
              <Link className="bg-primary px-5 py-3 rounded-md" href="/sign-up">Sign Up</Link>
            </div>
          ) : (
            <div className="flex-center gap-10 self-end animate-in fade-in duration-500">
              <Link href={`/profile/${user.id}`}>
                <Image
                  src={user.avatar?.length ? user.avatar : '/assets/general/icons/user-green.svg'}
                  className="rounded-full"
                  width={48}
                  height={48}
                  alt="user"
                />
              </Link>
            </div>
          )}
        </>
      ) : (
        <Skeleton className="w-12 h-12 bg-black-400 rounded-full" />
      )}
    </nav>
  )
}

export default Navbar
