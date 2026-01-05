export default function Card({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 10,
          padding: 16,
          boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: 18 }}>{title}</h2>
        {children}
      </div>
    );
  }
  