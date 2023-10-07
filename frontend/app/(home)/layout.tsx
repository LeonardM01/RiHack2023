import Navbar from '@/components/general/Navbar';
import { ReactNode } from 'react'

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-8xl mx-auto max-3xl:px-5">
      <Navbar />
      {children}
    </div>
  )
}

export default HomeLayout;
