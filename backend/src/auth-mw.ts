import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve } from 'path';

let initialized = false;
if (!initialized) {
  // file-based: avoids Windows newline issues
  const raw = readFileSync(resolve('service-account.json'), 'utf-8');
  const cred = JSON.parse(raw);
  admin.initializeApp({ credential: admin.credential.cert(cred) });
  initialized = true;
}

export async function verifyAuthHeader(authHeader?: string) {
  if (!authHeader?.startsWith('Bearer ')) throw new Error('Missing bearer token');
  const idToken = authHeader.slice('Bearer '.length);
  return admin.auth().verifyIdToken(idToken);
}
