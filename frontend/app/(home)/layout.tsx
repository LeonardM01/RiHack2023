import MobileNavbar from '@/components/general/MobileNavbar';
import Navbar from '@/components/general/Navbar';
import { ReactNode } from 'react'

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-8xl mx-auto">
      <Navbar />
      <MobileNavbar />
      <div className='max-md:px-5 max-md:pt-5'>
        {children}
      </div>
    </div>
  )
}

export default HomeLayout;
