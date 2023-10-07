"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Problem } from "@/types";
import { Database } from "@/types/supabase";
import { getUserProblems } from "@/lib/actions/supabase/problems.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";

interface ProblemValue {
  problemId: number;
  amount: string;
}

function StatusUpdate() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const supabase = createClientComponentClient<Database>();
  const [problemValues, setProblemValues] = useState<ProblemValue[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const problems = await getUserProblems(supabase, session!.user.id) as Problem[];
      setProblems(problems);
      setProblemValues(problems.map((problem) => ({ problemId: problem.id, amount: "" })));
    };
    fetchProblems();
  }, []);

  const handleProblemValueChange = (problemIndex: number, value: string) => {
    const newProblemValues = [...problemValues];
    newProblemValues[problemIndex].amount = value;
    setProblemValues(newProblemValues);
  };

  const handleSubmit = async () => {
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
  };

  return (
    <Card className="flex justify-center flex-col align-middle gap-2 p-5">
      {problems.length && problems.map((problem, index) => (
        <div className="flex justify-center flex-col align-middle gap-2 p-5" key={index}>
          <CardTitle>{problem.name}</CardTitle>
          <Input type="text" value={problemValues.at(index).amount}
                 onChange={(e) => handleProblemValueChange(index, e.target.value)} />
        </div>
      ))}
      <Button onClick={handleSubmit}>Submit</Button>
    </Card>
  );
}

export default StatusUpdate;
