import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

import { listConversations } from "@/lib/actions/supabase/conversations.actions";
import ChatCard from "./ChatCard";
import { Conversation } from "@/types";

const Sidebar = async () => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const conversationData = await listConversations(supabase, user?.id || "");

  return (
    <section className='max-w-xs w-full flex flex-col bg-black-300 max-md:px-5 px-10 py-5 h-screen absolute rounded-e-lg'>
      {conversationData.length && (
        <>
          {conversationData.map((convo: Conversation) => (
            <ChatCard convo={convo} />
          ))}
        </>
      )}
    </section>
  );
};

export default Sidebar;
