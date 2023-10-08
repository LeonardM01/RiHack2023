import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const POST = async (req: NextRequest) => {
  const resend = new Resend("re_iJsXorRz_LVr6CHFsADa1fHECwLFWRNHy");

  const { email } = await req.json();
  try {
    const data = await resend.sendEmail({
      from: `RiGrow <contact@9276-193-198-209-225.ngrok-free.app>`,
      to: email,
      subject: "Hi, congrats on completeing your journey!",
      html: "<p>Congrats on planting your <strong>First Tree</strong>!</p>",
    });

    console.log(data);

    return NextResponse.json({
      success: true,
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      status: 500,
    });
  }
};
