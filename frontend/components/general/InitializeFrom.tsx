"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function InitializeFrom() {
  const [open] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [goal, setGoal] = useState<number>();
  const [plantName, setPlantName] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);

    await fetch("/api/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        goal,
        plantName
      })
    });

    router.refresh();

  }

  return (
    <Dialog open={open}>
      <DialogContent className="text-black-100">
        <DialogHeader>
          <DialogTitle className="text-xl">Quick questionnaire about your habits.</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-4">
          <DialogDescription>
            What is your average daily cigarette consumption?
          </DialogDescription>
          <Input type="number" className="text-md" onChange={(e) => setGoal(parseInt(e.target.value))}/>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <DialogDescription>
            In how many months are you aiming to quit?
          </DialogDescription>
          <Input type="number" className="text-md" />
        </div>
        <div className="flex flex-col gap-2 py-4">
          <DialogDescription>
            How did you find about our app?
          </DialogDescription>
          <Input type="text" className="text-md" />
        </div>
        <div className="flex flex-col gap-2 py-4">
          <DialogDescription>
            What would you like to name your plant?
          </DialogDescription>
          <Input type="text" className="text-md" onChange={(e) => setPlantName(e.target.value)}/>
        </div>
        <Button onClick={handleSubmit} disabled={loading} className="mt-2">{loading ?
          <Loader2 className="animate-spin"/> : "Submit"}</Button>
      </DialogContent>
    </Dialog>
  );
}

export default InitializeFrom;
