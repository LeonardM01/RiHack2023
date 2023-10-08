import InfoCards from "@/components/general/InfoCards";
import MonthlyChart from "@/components/general/MonthlyChart";
import ProgressSection from "@/components/general/ProgressSection";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import InitializeFrom from "@/components/general/InitializeFrom";

const Home = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const userId = (await supabase.auth.getUser()).data.user?.id || "";
  const {data: user} = await supabase.from('profiles').select('*').eq('id', userId).single();
  const userInitialized = user?.initialized ?? false;
  if (!userInitialized) {
    return <InitializeFrom />
  }
  return (
    <main className="flex-center w-full h-full flex-col max-md:flex-col-reverse pb-14">
      <InfoCards />

      <section className="mt-20 flex-between w-full gap-x-24 gap-y-8 max-lg:flex-col overflow-hidden">
        <ProgressSection />
        <MonthlyChart />
      </section>
    </main>
  )
}

export default Home;
