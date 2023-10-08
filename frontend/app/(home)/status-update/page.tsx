"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Problem } from "@/types";
import { Database } from "@/types/supabase";
import { getProblemStatistics, getUserProblems } from "@/lib/actions/supabase/problems.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

interface ProblemValue {
  problemId: number;
  amount: string;
}

function StatusUpdate() {
  const [loading, setLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const supabase = createClientComponentClient<Database>();
  const [problemValues, setProblemValues] = useState<ProblemValue[]>([]);

  useEffect(() => {
    const getStatistics = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const data = await getProblemStatistics(supabase, session!.user.id);
      if (data.some((obj) => new Date(obj.created_at).toDateString() === new Date().toDateString())) {
        // setCompleted(true);
      }
    }
    const fetchProblems = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const problems = await getUserProblems(supabase, session!.user.id) as Problem[];
      setProblems(problems);
      setProblemValues(problems.map((problem) => ({ problemId: problem.id, amount: "" })));
    };
    getStatistics().then(fetchProblems);
  }, []);

  const handleProblemValueChange = (problemIndex: number, value: string) => {
    const newProblemValues = [...problemValues];
    newProblemValues[problemIndex].amount = value;
    setProblemValues(newProblemValues);
  };

  const handleSubmit = async () => {
    setLoading(true);
    for (const problemValue of problemValues) {
      if (!problemValue.amount) continue;
      await fetch(`/api/status-update`, {
        method: "POST",
        body: JSON.stringify(problemValue),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    setCompleted(true);
  };

  if (completed) return (
    <Card className="flex justify-center items-center flex-col gap-4 px-24 py-8 max-w-2xl">
      <CheckCircle2 className="h-1/6 w-1/6"/>
      <CardTitle className="text-lg md:text-xl text-center">Thank you for your submission!</CardTitle>
      <CardDescription className="text-center">Please come back tomorrow for another submission.</CardDescription>
      <Link href={"/"}>Back to Homepage</Link>
    </Card>
  )

  if (!problems.length) return (
    <Card className="flex justify-center items-center flex-col gap-4 px-24 py-8 max-w-2xl">
      <MyLoader />
    </Card>
  );

  return (
    <Card className="flex justify-center flex-col gap-4 px-10 py-4 md:px-24 md:py-8 max-w-2xl">
      <CardTitle className="text-center py-4 text-2xl">Daily progress submission</CardTitle>
      {problems.map((problem, index) => (
        <form className="flex justify-center flex-col gap-2" key={index}>
          <CardHeader className="text-lg md:text-xl p-2">{problemTitle[problem.name]}</CardHeader>
          <Input type="text" value={problemValues.at(index)!.amount} required
                 onChange={(e) => handleProblemValueChange(index, e.target.value)} />
        </form>
      ))}
      <Button className="w-100 mt-5 text-lg" disabled={loading} onClick={handleSubmit}>{loading ?
        <MyLoader /> : "Submit"}</Button>
    </Card>
  );
}

const MyLoader = () => (
  <Loader2 className="md:h-1/12 md:w-1/12 animate-spin" />
);

export default StatusUpdate;

const problemTitle: Record<string, string> = {
  smoking: "Enter the amount of smoked cigarettes today:",
  alcohol: "Enter the amount of alcohol drinks today:"
};
