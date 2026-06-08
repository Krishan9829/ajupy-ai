import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(req: Request) {
  const { dataset_id, image_url, prompt } = await req.json();

  const { data, error } = await supabaseAdmin
    .from("dataset_images")
    .insert([{ dataset_id, image_url, prompt }]);

  return Response.json({ data, error });
}