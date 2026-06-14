import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const { user_id, name } = await req.json();

    const { data, error } = await supabaseAdmin
      .from("datasets")
      .insert([{ user_id, name }])
      .select();

    return Response.json({ data, error });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}