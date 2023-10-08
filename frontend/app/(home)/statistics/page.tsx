import DataTable from "@/components/general/DataFile";
import PlantsGraph from "@/components/general/PlantsGraph";
import { getPlants } from "@/lib/actions/supabase/plants.actions";
import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const columns: any = [
  {
    accessorKey: "name",
    header: "Name of the plant",
  },
  {
    accessorKey: "growth",
    header: "Growth",
  },
  {
    accessorKey: "growth_multiplier",
    header: "Growth Multiplier",
  },
];

const page = async () => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const plants = await getPlants(supabase, user?.id || "");

  return (
    <main className='flex-center w-full h-full flex-col max-md:flex-col-reverse pb-14 mt-10'>
      <section className="w-full flex-between gap-2">
        <DataTable data={plants} columns={columns} />
        <PlantsGraph />
      </section>
    </main>
  );
};

export default page;
