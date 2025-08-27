import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const onLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("idToken");
    location.href = "/login";
  };
  return (
    <div className="p-4 flex justify-between items-center">
      <div className="font-semibold">Shabamorix Hire</div>
      <button onClick={onLogout} className="px-3 py-1 rounded bg-gray-100">
        Logout
      </button>
    </div>
  );
}
