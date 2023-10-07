"use client";

import { useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { AuthContext } from "../providers/AuthProvider";
import { Database } from "@/types/supabase";
import { getProblemStatistics } from "@/lib/actions/supabase/problems.actions";

const MonthlyChart = () => {
  const [graphData, setGraphData] = useState<Array<{ date: string, value: number }> | null>(null);

  const { user } = useContext(AuthContext);

  const supabase = createClientComponentClient<Database>();

  const getProgress = async () => {
    const data = await getProblemStatistics(supabase, user?.id || "");
    data.map((day) => {
      let updatedGraphData = graphData || [];
      updatedGraphData.push({
        date: new Date(day.created_at).getDay().toString(),
        value: day.daily_amount,
      })
      setGraphData(updatedGraphData)
    })
  }

  useEffect(() => {
    if (user?.id) getProgress();
  }, [user])

  return (
    <div className="w-1/2 bg-black-300 px-4 flex-start py-16 rounded-md h-full">
      {graphData && (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={graphData}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey="total" fill="#3AB67E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default MonthlyChart
