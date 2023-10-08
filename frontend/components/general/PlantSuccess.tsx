"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createPlant } from "@/lib/actions/supabase/plants.actions";
import Script from "next/script";

function PlantSuccess(props: {
  setProgress: Dispatch<SetStateAction<number | null>>;
  setProgressUrl: Dispatch<SetStateAction<string | null>>;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSubmit = async () => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user!.id;
    await createPlant(supabase, {
      owner: userId,
      name: "Plant",
    });
    setOpen(false);

    await fetch("/api/emails", {
      method: "POST",
      body: JSON.stringify({
        email: user.data.user?.email,
      }),
    });

    router.replace("/");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Script
        src='https://cdn.paddle.com/paddle/paddle.js'
        onReady={() => {
          Paddle.Environment.set("sandbox");
          Paddle.Setup({ vendor: 11035 });
        }}
      />
      <DialogContent className='text-black-100 flex justify-center items-center flex-col gap-6'>
        <PartyPopper className='w-1/4 h-1/4' />
        <DialogHeader>
          <DialogTitle className='text-xl text-center'>
            Congratulations, your plant has fully grown! <br />
            Well done on nurturing it to its full potential!
          </DialogTitle>
          <DialogDescription className='text-center py-2'>
            Remember, you can continue by cultivating more plants and further
            enrich your healing journey. Keep up the fantastic work!
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-5 self-start w-full">
          <a href='#!' className='flex-center w-full bg-primary px-3 py-2 rounded-lg text-white body-regular' data-product='65085'>
            Donate Now
          </a>
          <Button onClick={handleSubmit} className=' text-white w-full body-regular'>
            Plant a new tree
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlantSuccess;
