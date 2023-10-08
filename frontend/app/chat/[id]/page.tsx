"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

import { AuthContext } from "@/components/providers/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { listConversationsById } from "@/lib/actions/supabase/conversations.actions";
import { listMessagesByConvId } from "@/lib/actions/supabase/messages.actions";
import { getUserById } from "@/lib/actions/supabase/users.actions";
import { Messages, Profile } from "@/types";
import { Database } from "@/types/supabase";
import { Input } from "@/components/ui/input";

const Chat = ({ params }: { params: { id: string } }) => {
  const [messages, setMessages] = useState<any>([]);
  const [sender, setSender] = useState<Profile | null>(null);
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const { user } = useContext(AuthContext);

  const supabase = createClientComponentClient<Database>();

  const getPastMessages = async () => {
    const messagesData = await listMessagesByConvId(supabase, params.id);
    const conversationData = await listConversationsById(
      supabase,
      params.id,
      user?.id || ""
    );

    console.log(user?.id)
    if (messagesData.length) {
      console.log(messagesData);
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

      const socketInstance = io("http://192.168.102.254:3001", {
        extraHeaders: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      socketInstance.emit("joinRoom", params.id, user?.id);

      socketInstance.on("msg", ({ message, sender }) => {
        let updatedMessage = messages;
        updatedMessage.push({
          text: message,
          sent_by: sender,
        });
        setMessages(updatedMessage);
        const element = document.getElementById("chat");

        if (element) {
          element.scrollTop = element.scrollHeight;
        }
      });
      setSocket(socketInstance);
    }
  }, [user, messages]);

  const sendMessage = async () => {
    console.log(user?.id)
    if (socket) socket.emit("message", params.id, message, user?.id);
  };

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
      <div className='max-h-[780px] w-full overflow-auto pb-7' id='chat'>
        {messages?.length ? (
          <section className='mt-5 w-full flex flex-col gap-2 overflow-auto'>
            {messages?.map((message: Messages) => (
              <div
                key={message.id}
                className={`flex gap-2 ml-5 ${
                  message.sent_by === user?.id ? "self-end" : "self-start"
                }`}
              >
                {/* <Image
                  src={
                    message.sent_by === user?.id
                      ? !user.avatar
                        ? "/assets/general/icons/user-green.svg"
                        : user.avatar
                      : sender.avatar
                      ? "/assets/general/icons/user-green.svg"
                      : sender.avatar
                  }
                  className='rounded-full'
                  width={50}
                  height={50}
                  alt='avatar'
                /> */}
                <div className={`text-white h-fit self-center rounded-lg p-2 body-regular ${message.sent_by === user?.id ? 'bg-primary' : 'bg-black-400'}`}>
                  {message.text}
                </div>
              </div>
            ))}
            <div className='px-5'>
              <Input
                className='fixed bottom-0 w-full h-fit text-black'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                    setMessage("");
                  }
                }}
              />
            </div>
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
      </div>
    </main>
  );
};

export default Chat;
