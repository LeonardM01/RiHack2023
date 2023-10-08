import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { listConversations } from "@/lib/actions/supabase/conversations.actions";
import { Card, CardTitle } from "@/components/ui/card";

async function ChatOverview() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const user = await supabase.auth.getUser();
  const conversations = await listConversations(supabase, user.data.user!.id);


  return (
    <Card className="flex min-h-fit">
      <div className="bg-amber-50 p-5 flex flex-col">
        {conversations?.map((conversation) => (
          <div>
            <CardTitle>{conversation.friendId}</CardTitle>
          </div>
        ))}
      </div>
      <div className="bg-amber-300"></div>
    </Card>
  );
}

export default ChatOverview;
