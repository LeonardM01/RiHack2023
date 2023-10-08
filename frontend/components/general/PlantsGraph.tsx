"use client";

import { useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts"

import { AuthContext } from "../providers/AuthProvider";
import { Database } from "@/types/supabase";
import { Skeleton } from "../ui/skeleton";
import { getPlantStatistics } from "@/lib/actions/supabase/plants.actions";

const PlantsGraph = () => {
  const [graphData, setGraphData] = useState<Array<{ date: string, value: number }> | null>(null);

  const { user } = useContext(AuthContext);

  const supabase = createClientComponentClient<Database>();

  const getProgress = async () => {
    const data = await getPlantStatistics(supabase, user?.id || "");
    let updatedGraphData = graphData || [];

    console.log(updatedGraphData)
    if (data) {
      data.map((day) => {
        updatedGraphData.push({
          date: `${new Date(day.created_at).getDay()+1}.${new Date(day.created_at).getMonth()+1}`,
          value: day.growth*100,
        })
      })
      setGraphData(updatedGraphData)
    }
  }

  useEffect(() => {
    if (user?.id) getProgress();
  }, [user])

  return (
    <div className="lg:w-1/2 bg-black-300 px-4 flex-center py-16 rounded-md h-full w-full">
      {graphData?.length ? (
        <ResponsiveContainer
          width="100%"
          height={350}
          className="animate-in fade-in duration-500"
        >
          <BarChart data={graphData}>
            <CartesianGrid stroke="#242C38" />
            <XAxis
              label={{ value: 'Date', position: 'insideBottom' }}
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={true}
              axisLine={false}
            />
            <YAxis
              label={{ value: 'Daily intake', angle: -90, position: 'insideLeft' }}
              stroke="#888888"
              fontSize={12}
              tickLine={true}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="value" fill="#3AB67E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Skeleton className="h-[350px] w-2/3 bg-black-400" />
      )}
    </div>
  )
}

export default PlantsGraph
