"use client";

import { AuthContext } from "@/components/providers/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { listConversations, listConversationsById } from "@/lib/actions/supabase/conversations.actions";
import { listMessagesByConvId } from "@/lib/actions/supabase/messages.actions";
import { getUserById } from "@/lib/actions/supabase/users.actions";
import { Conversation, Messages, Profile } from "@/types";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const Chat = ({ params }: { params: { id: string } }) => {
  const [messages, setMessages] = useState<Array<Messages> | null>(null);
  const [sender, setSender] = useState<Profile | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const { user } = useContext(AuthContext);

  const supabase = createClientComponentClient<Database>();

  const getPastMessages = async () => {
    const messagesData = await listMessagesByConvId(supabase, params.id);
    const conversationData = await listConversationsById(supabase, params.id, user?.id || "");
    console.log(conversationData[0].friendId);
    if (messagesData.length) {
      const senderData = await getUserById(
        supabase,
        conversationData[0].friendId || ""
      );
      setSender(senderData);
    }

    setMessages(messagesData);
  };

  useEffect(() => {
    if (user) {
      getPastMessages();
    }
  }, [user]);

  return (
    <main className='pl-[320px] flex justify-start items-center flex-col w-full'>
      <h3 className='self-start flex items-center gap-2 bg-black-400 h-[66px] w-full pl-5 py-2'>
        {sender ? (
          <>
            <Image
              src={
                sender.avatar
                  ? sender.avatar
                  : "/assets/general/icons/user-green.svg"
              }
              className='rounded-full'
              width={50}
              height={50}
              alt='avatar'
            />
            <p>
              {sender.first_name} {sender.last_name}
            </p>
          </>
        ) : (
          <div className='flex-center gap-2'>
            <Skeleton className='w-[50px] h-[50px] bg-black-300 rounded-full' />
            <Skeleton className='w-[100px] h-[16px] bg-black-300 rounded-md' />
          </div>
        )}
      </h3>
      {messages?.length ? (
        <section className='mt-5 w-full flex flex-col gap-2'>
          {messages?.map((message: Messages) => (
            <div
              key={message.id}
              className={`flex gap-2 ml-5 ${
                message.sent_by === user?.id ? "self-start" : "self-end"
              }`}
            >
              <Image
                src={
                  message.sent_by === user?.id
                    ? (!user.avatar ? '/assets/general/icons/user-green.svg'
                    : user.avatar) : (sender.avatar ? '/assets/general/icons/user-green.svg'
                    : sender.avatar)
                }
                className='rounded-full'
                width={50}
                height={50}
                alt='avatar'
              />
              <div className='text-white bg-black-400 h-fit self-center rounded-lg p-2 body-regular'>
                {message.text}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <>
        <div className='flex self-start items-center gap-2 mt-5 ml-5'>
            <Skeleton className='w-[50px] h-[50px] bg-black-300 rounded-full' />
            <Skeleton className='w-[100px] h-[16px] bg-black-300 rounded-md' />
        </div>
        <div className='flex self-start items-center gap-2 mt-5 ml-5'>
            <Skeleton className='w-[50px] h-[50px] bg-black-300 rounded-full' />
            <Skeleton className='w-[100px] h-[16px] bg-black-300 rounded-md' />
        </div>
        </>
      )}
    </main>
  );
};

export default Chat;
