import { Link } from 'react-router-dom'
export default function HomePage(){
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 max-w-6xl mx-auto w-full">
        <div className="text-lg font-semibold">Shabamorix Hire</div>
        <Link to="/login" className="btn">Sign In</Link>
      </header>
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Smarter Interviews. Better Careers.</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">AI-powered prep, tests, and live interviews—simple and effective.</p>
          <div className="mt-6 space-x-2">
            <Link to="/login" className="btn">I’m a Candidate</Link>
            <Link to="/login" className="btn-secondary">I’m an Interviewer</Link>
          </div>
        </section>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 border-t">© 2025 Shabamorix</footer>
    </div>
  )
}
