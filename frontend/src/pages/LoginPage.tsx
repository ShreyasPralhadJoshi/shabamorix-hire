import { useState } from 'react';
import { auth } from '../lib/firebase';
import { getIdToken, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();

export default function LoginPage(){
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      const token = await getIdToken(auth.currentUser!, true);
      localStorage.setItem('idToken', token);
      await api('/auth/upsert', { method:'POST', body: JSON.stringify({}) });
      nav('/role');
    } catch (e) {
      console.error(e);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="card p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center">Sign in to Shabamorix</h1>
        <button className="btn w-full" onClick={onGoogle} disabled={loading}>
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
}
