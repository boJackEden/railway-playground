import { useEffect, useState } from "react";
import API from "./api";
import type { AuthMeResponse, User } from "./types";

import Page from "./components/Page";
import Header, { type View } from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedPage from "./pages/ProtectedPage";

export default function App() {
  const [view, setView] = useState<View>("login");
  const [user, setUser] = useState<User | null>(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBooting(false);
      setView("login");
      return;
    }

    API.get<AuthMeResponse>("/auth/me")
      .then((res) => {
        setUser(res.data.user);
        setView("protected");
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setView("login");
      })
      .finally(() => setBooting(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setView("login");
  };

  if (booting) return <Page><p>Loading…</p></Page>;

  return (
    <Page>
      <Header user={user} view={view} onNav={setView} onLogout={logout} />

      {view === "register" && !user && (
        <RegisterPage
          onRegistered={() => setView("login")}
          onGoLogin={() => setView("login")}
        />
      )}

      {view === "login" && !user && (
        <LoginPage
          onLoggedIn={(u) => {
            setUser(u);
            setView("protected");
          }}
          onGoRegister={() => setView("register")}
        />
      )}

      {view === "protected" && (
        <ProtectedPage user={user} onForceLogout={logout} />
      )}
    </Page>
  );
}
