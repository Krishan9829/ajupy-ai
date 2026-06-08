import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(req: Request) {
  const { user_id, model_name, dataset_id, style } = await req.json();

  const { data } = await supabaseAdmin
    .from("custom_models")
    .insert([
      {
        user_id,
        model_name,
        dataset_id,
        style,
      },
    ]);

  return Response.json({ model: data });
}