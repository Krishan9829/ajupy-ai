import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(req: Request) {
  const { dataset_id, model_name } = await req.json();

  const { data } = await supabaseAdmin
    .from("training_jobs")
    .insert([
      {
        dataset_id,
        model_name,
        status: "queued",
        progress: 0,
      },
    ])
    .select();

  return Response.json({ job: data });
}