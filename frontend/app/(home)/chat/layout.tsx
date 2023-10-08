import { ReactNode } from 'react'

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-8xl mx-auto max-3xl:px-5 flex ">
      {children}
    </div>
  )
}

export default ChatLayout;
