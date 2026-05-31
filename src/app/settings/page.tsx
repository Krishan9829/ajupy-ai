import Sidebar from "@/components/layout/sidebar";

export default function SettingsPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <main
        style={{
          marginLeft: "260px",
          padding: "30px",
        }}
      >
        <h1>Settings</h1>

        <p>User preferences will be managed here.</p>
      </main>
    </div>
  );
}