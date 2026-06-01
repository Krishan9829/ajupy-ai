import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { title, content, image } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title & content required" },
        { status: 400 }
      );
    }

    // ✅ ENV (safe access)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      console.error("❌ Supabase ENV missing");
      return NextResponse.json(
        { error: "Server config error" },
        { status: 500 }
      );
    }

    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from("collections")
      .insert([
        {
          title,
          content,
          image: image || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      collection: data,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        error: err.message || "Server error",
      },
      { status: 500 }
    );
  }
}