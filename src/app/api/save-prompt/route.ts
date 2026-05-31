import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const { prompt, response } = await req.json();

    const { data, error } = await supabaseAdmin
      .from("prompt_history")
      .insert([
        {
          prompt,
          response,
        },
      ])
      .select();

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message,
      },
      { status: 500 }
    );
  }
}