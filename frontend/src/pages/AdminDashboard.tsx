import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function AdminDashboard(){
  const [me,setMe]=useState<any>(null);
  useEffect(()=>{ api('/auth/me').then(setMe).catch(()=>{}); },[]);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Admin / Placement Dashboard</h1>
      {me && <p className="text-sm text-gray-600 mt-2">Signed in as {me.user.email}</p>}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="card p-4"><h3 className="font-medium">Companies</h3><p className="text-sm text-gray-600">Manage visiting companies.</p></div>
        <div className="card p-4"><h3 className="font-medium">Drives</h3><p className="text-sm text-gray-600">Setup test → interview → offers.</p></div>
        <div className="card p-4"><h3 className="font-medium">Analytics</h3><p className="text-sm text-gray-600">Placement stats & reports.</p></div>
      </div>
    </div>
  )
}
