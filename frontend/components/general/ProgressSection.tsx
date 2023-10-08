"use client"

import { useContext, useEffect, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import LottiePlayer from "@/components/general/LottiePlayer";
import { getPlantByUserId } from "@/lib/actions/supabase/plants.actions";
import { Database } from "@/types/supabase";
import { AuthContext } from "../providers/AuthProvider";
import { calculateProgress } from "@/lib/utils";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";

const ProgressSection = () => {
  const [progressUrl, setProgressUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const { user } = useContext(AuthContext);

  const supabase = createClientComponentClient<Database>();

  const getProgress = async () => {
    const plantInfo = await getPlantByUserId(supabase, user?.id || "");
console.log(plantInfo)
    if (plantInfo.length) {
      setProgressUrl(calculateProgress(plantInfo[0].growth))
      setProgress(plantInfo[0].growth)
    }
  }
  useEffect(() => {
    if (user) {
      getProgress();
    }
  }, [user])

  return (
    <div className="flex-center flex-col gap-y-5 lg:w-1/2 bg-black-300 md:px-20 px-10 pt-8 pb-10 rounded-lg w-full">
      <h1 className="heading3">Your Progress</h1>
      {progressUrl ? (
        <>
          <LottiePlayer
            url={`/assets/animations/${progressUrl}`}
          />
          <Progress value={progress! * 100} className="bg-black-400 mt-8 animate-in fade-in duration-500" />
        </>
      ) : (
        <>
          <Skeleton className="w-[250px] h-[331px] bg-black-400" />
          <Skeleton className="w-full h-4 bg-black-400 rounded-full" />
        </>
      )}
    </div>
  )
}

export default ProgressSection
