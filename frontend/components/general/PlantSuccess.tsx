"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createPlant } from "@/lib/actions/supabase/plants.actions";

function PlantSuccess(props: { setProgress: Dispatch<SetStateAction<number | null>>, setProgressUrl: Dispatch<SetStateAction<string | null>>}) {
  const [open, setOpen] = useState<boolean>(true);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSubmit = async () => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user!.id
    await createPlant(supabase, {
      owner: userId,
      name: "Plant",
    });
    setOpen(false);

    await fetch('/api/emails', {
      method: 'POST',
      body: JSON.stringify({
        email: user.data.user?.email,
      })
    })

    router.replace("/")
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-black-100 flex justify-center items-center flex-col gap-6">
        <PartyPopper className="w-1/4 h-1/4" />
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Congratulations, your plant has fully grown! <br />
            Well done on nurturing it to its full
            potential!</DialogTitle>
          <DialogDescription className="text-center py-2">
            Remember, you can continue by cultivating more plants and further enrich your healing journey. Keep up the
            fantastic work!
          </DialogDescription>
        </DialogHeader>
        <Button onClick={handleSubmit} className="bg-primary text-white">Continue</Button>
      </DialogContent>
    </Dialog>
  );
}

export default PlantSuccess;
