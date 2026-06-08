import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
export async function POST(req: Request) {
  const { user_id, name } = await req.json();

  const { data, error } = await supabaseAdmin
    .from("datasets")
    .insert([{ user_id, name }])
    .select();

  return Response.json({ data, error });
}