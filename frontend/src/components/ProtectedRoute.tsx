import { Navigate } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import { auth } from "../lib/firebase"; // adjust if your path differs

type Props = {
  children: ReactNode;
  // optional role gate (wire later when you store roles on the user)
  allow?: ("CANDIDATE" | "INTERVIEWER" | "ADMIN")[];
};

export default function ProtectedRoute({ children }: Props) {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setLoggedIn(!!u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  if (!ready) return null; // or a spinner/loading skeleton
  if (!loggedIn) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
