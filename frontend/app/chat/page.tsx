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
    <div>
      heykl
    </div>
  );
}

export default ChatOverview;
