import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';

const app = express();
const port = Number(process.env.PORT || 5001);
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

// CORS (dev-friendly)
app.use(cors({ origin: (o, cb)=>cb(null, true), credentials: true }));
app.use(json());

// health
app.get('/health', (_req, res) => res.json({ ok: true, service: 'api', time: new Date().toISOString() }));

// routes
app.use('/auth', authRouter);

// error handler (show why login failed)
app.use((err:any, _req:any, res:any, _next:any) => {
  const status = err?.status || (''+err?.message).includes('Missing bearer') ? 401 : 500;
  res.status(status).json({ ok:false, error: err?.message || 'Server error' });
  console.error('ERROR:', err);
});

app.listen(port, () => console.log(`API running on http://localhost:${port}`));
