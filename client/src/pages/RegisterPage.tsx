import { useState } from "react";
import API from "../api";
import Card from "../components/Card";
import Field from "../components/Field";

export default function RegisterPage({
  onRegistered,
  onGoLogin,
}: {
  onRegistered: () => void;
  onGoLogin: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    try {
      await API.post("/auth/register", { email, password });
      setMsg("Account created! Now log in.");
      onRegistered();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setMsg(err?.response?.data?.message ?? "Register failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card title="Create account">
      <form onSubmit={submit}>
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </Field>

        <Field label="Password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </Field>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button type="submit" disabled={busy}>
            {busy ? "Creating…" : "Create account"}
          </button>
          <button type="button" onClick={onGoLogin} disabled={busy}>
            I already have an account
          </button>
        </div>

        {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      </form>
    </Card>
  );
}
