import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password, first_name, last_name } = await request.json();

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

  try {
    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            full_name: `${first_name} ${last_name}`,
          }
        }
      });
    if (data.user) {
      return NextResponse.json("success", { status: 201 });
    } else {
      console.log(error)
      return NextResponse.json(`${error?.message}`, { status: 404 })
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json("Internal server error", { status: 500 })
  }
}
