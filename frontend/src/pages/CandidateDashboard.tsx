import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CandidateDashboard() {
  // ...keep your existing "Signed in as" header etc.
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Candidate Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/resume" className="card">
            <h3 className="font-semibold">Resume</h3>
            <p className="text-sm text-gray-600">Upload & score your resume.</p>
          </Link>

          <Link to="/tests" className="card">
            <h3 className="font-semibold">Tests</h3>
            <p className="text-sm text-gray-600">Aptitude & coding tests.</p>
          </Link>

          <Link to="/interviews" className="card">
            <h3 className="font-semibold">Interviews</h3>
            <p className="text-sm text-gray-600">Schedule & join interviews.</p>
          </Link>
        </div>
      </main>
    </>
  );
}
