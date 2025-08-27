import { useState } from 'react';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function RoleSelect(){
  const [role, setRole] = useState<'CANDIDATE'|'INTERVIEWER'|'ADMIN'>('CANDIDATE');
  const nav = useNavigate();

  const save = async () => {
    await api('/auth/upsert', { method:'POST', body: JSON.stringify({ role }) });
    nav(role === 'CANDIDATE' ? '/candidate' : role === 'INTERVIEWER' ? '/interviewer' : '/admin');
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="card p-6 w-full max-w-md">
        <h2 className="text-lg font-medium mb-3">Choose your role</h2>
        <div className="space-y-2">
          {(['CANDIDATE','INTERVIEWER','ADMIN'] as const).map(r=>(
            <label key={r} className="flex items-center gap-2">
              <input type="radio" name="role" checked={role===r} onChange={()=>setRole(r)} /> {r}
            </label>
          ))}
        </div>
        <button className="btn w-full mt-4" onClick={save}>Continue</button>
      </div>
    </div>
  )
}
