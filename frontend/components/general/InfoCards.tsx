import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { getProblemStatistics } from '@/lib/actions/supabase/problems.actions'
import Link from 'next/link'

const InfoCards = async () => {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { data: { user } } = await supabase.auth.getUser();

  const statsData = await getProblemStatistics(supabase, user?.id || "");

  return (
    <section className="w-full flex h-full gap-10 flex-wrap mt-10">
      <Card className="w-[330px] bg-black-300 text-white border-0">
        <CardHeader>
          <CardTitle>Message of the day</CardTitle>
        </CardHeader>
        <CardContent className="heading4 text-primary">
          Burn calories, not your lungs
        </CardContent>
      </Card>

      <Card className="w-[330px] bg-black-300 text-white border-0">
        <CardHeader>
          <CardTitle>Daily Goal</CardTitle>
          <CardDescription>Your daily goal of cigarette intake</CardDescription>
        </CardHeader>
        <CardContent className="heading3">
          {statsData[0].goal} <span className="heading4">cigarettes</span>
        </CardContent>
      </Card>

      <Card className="w-[330px] bg-black-300 text-white border-0">
        <CardHeader>
          <CardTitle>Consumed today</CardTitle>
          <CardDescription>Your current number of cigarettes</CardDescription>
        </CardHeader>
        <CardContent className="heading3">
          {statsData[0].daily_amount} <span className="heading4">cigarettes</span>
        </CardContent>
      </Card>

      <Card className="w-[330px] bg-black-300 text-white border-0">
        <CardHeader>
          <CardTitle>Games</CardTitle>
          <CardDescription>Train your focus</CardDescription>
        </CardHeader>
        <CardContent className="heading3">
          <Link href="/games" className="text-orange">Play Now!</Link>
        </CardContent>
      </Card>
    </section>
  )
}

export default InfoCards
