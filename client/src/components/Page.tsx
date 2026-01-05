export default function Page({ children }: { children: React.ReactNode }) {
    return (
      <div
        style={{
          maxWidth: 520,
          margin: "40px auto",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          padding: 12,
        }}
      >
        {children}
      </div>
    );
  }
  