import type { User } from "../types";

export type View = "login" | "register" | "protected";

export default function Header({
  user,
//   view,
//   onNav,
  onLogout,
}: {
  user: User | null;
  view: View;
  onNav: (v: View) => void;
  onLogout: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 18,
      }}
    >
      <h1 style={{ margin: 0, fontSize: 20 }}>Railway Demo App</h1>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        {!user ? (
          <>
            {/* <button onClick={() => onNav("login")} disabled={view === "login"}>
              Login
            </button>
            <button
              onClick={() => onNav("register")}
              disabled={view === "register"}
            >
              Register
            </button> */}
          </>
        ) : (
          <>
            <span style={{ fontSize: 14 }}>
              Signed in as <strong>{user.email}</strong>
            </span>
            <button onClick={onLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}
