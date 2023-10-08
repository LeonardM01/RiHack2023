import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { getUserById } from "@/lib/actions/supabase/users.actions";
import { Conversation } from "@/types";

const ChatCard = async ({
  convo,
}: {
  convo: {
    conversation: Conversation,
    friendId: string,
  };
}) => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const sender = await getUserById(supabase, convo.friendId || "");
  console.log(convo.friendId);

  return (
    <Link
      href={`/chat/${convo.id}`}
      className='flex gap-2 w-full'
    >
      <Image
        src={
          sender.avatar ? sender.avatar : "/assets/general/icons/user-green.svg"
        }
        width={70}
        height={70}
        className="rounded-full"
        alt='avatar'
      />
      <p className='self-center'>
        {sender.first_name} {sender.last_name}
      </p>
    </Link>
  );
};

export default ChatCard;
