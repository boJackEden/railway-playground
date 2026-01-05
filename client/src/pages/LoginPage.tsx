import { useState } from "react";
import API from "../api";
import type { AuthLoginResponse, User } from "../types";
import Card from "../components/Card";
import Field from "../components/Field";

export default function LoginPage({
  onLoggedIn,
  onGoRegister,
}: {
  onLoggedIn: (u: User) => void;
  onGoRegister: () => void;
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
      const res = await API.post<AuthLoginResponse>("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      onLoggedIn(res.data.user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setMsg(err?.response?.data?.message ?? "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card title="Log in">
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
            autoComplete="current-password"
          />
        </Field>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button type="submit" disabled={busy}>
            {busy ? "Logging in…" : "Log in"}
          </button>
          <button type="button" onClick={onGoRegister} disabled={busy}>
            Create an account
          </button>
        </div>

        {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      </form>
    </Card>
  );
}
