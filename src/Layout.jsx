import { Link, Outlet } from "react-router";
import { useAuth } from "./contexts/auth";

export default function Layout() {

  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <aside className="w-56 flex justify-between items-center m-auto">
        <Link to="/">Home</Link>
        {
          user === undefined
          ? <Link to="login">Login</Link>
          : <Link onClick={logout}>Log out</Link>
        }
        <Link to="profile">Profile</Link>
      </aside>
      <main className="h-[calc(100vh-100px)]"> 
          <Outlet />
      </main>
    </div>
  );
}