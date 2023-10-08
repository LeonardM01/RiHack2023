import Navbar from '@/components/general/Navbar';
import Sidebar from '@/components/general/Sidebar';
import { ReactNode } from 'react'

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      {children}
    </div>
  )
}

export default ChatLayout;
