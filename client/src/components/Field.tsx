export default function Field({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) {
    return (
      <label style={{ display: "block", marginTop: 10 }}>
        <div style={{ fontSize: 13, marginBottom: 6 }}>{label}</div>
        {children}
      </label>
    );
  }
  