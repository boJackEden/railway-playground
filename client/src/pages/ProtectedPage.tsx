import { useEffect, useState } from "react";
import API from "../api";
import type { AuthMeResponse, User } from "../types";
import Card from "../components/Card";

export default function ProtectedPage({
  user,
  onForceLogout,
}: {
  user: User | null;
  onForceLogout: () => void;
}) {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    API.get<AuthMeResponse>("/auth/me")
      .then((res) => {
        setEmail(res.data.user.email);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (!user) {
    return (
      <Card title="Protected page">
        <p>You’re not logged in.</p>
      </Card>
    );
  }

  return (
    <Card title="Protected page">
      {status === "loading" && <p>Checking session…</p>}

      {status === "error" && (
        <>
          <p>Your session is not valid (expired token, etc.).</p>
          <button onClick={onForceLogout}>Go to login</button>
        </>
      )}

      {status === "ok" && (
        <>
          <p>
            ✅ You’re authenticated.
            <br />
            Server confirmed your email as: <strong>{email}</strong>
          </p>
          <p style={{ color: "#666" }}>
            kewl content
          </p>
        </>
      )}
    </Card>
  );
}
