export default function ResultGrid({ result }: { result: any }) {
  if (!result) return null;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>👗 Fashion AI Output</h3>

      <p style={{ whiteSpace: "pre-wrap" }}>{result.text}</p>

      <img
        src={result.image}
        alt="Fashion AI"
        style={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 12,
          marginTop: 10,
          border: "1px solid #333",
        }}
      />
    </div>
  );
}