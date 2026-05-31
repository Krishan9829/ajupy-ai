import { supabaseAdmin } from "../../lib/supabase-admin";
import Sidebar from "../../components/layout/sidebar";

export default async function HistoryPage() {
  const { data } = await supabaseAdmin
    .from("prompt_history")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 ml-[240px] p-8">
        <h1 className="text-4xl font-bold mb-8">
          Prompt History
        </h1>

        <div className="space-y-4">
          {data?.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 p-5 rounded-xl border border-gray-800"
            >
              <h3 className="font-semibold text-blue-400">
                Prompt
              </h3>

              <p className="mb-4">
                {item.prompt}
              </p>

              <h3 className="font-semibold text-green-400">
                Response
              </h3>

              <p className="mb-4 whitespace-pre-wrap">
                {item.response}
              </p>

              <p className="text-sm text-gray-500">
                {item.created_at}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}