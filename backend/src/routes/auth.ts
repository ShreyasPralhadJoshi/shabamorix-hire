import { Router } from 'express';
import { prisma } from '../db';
import { verifyAuthHeader } from '../auth-mw';

export const authRouter = Router();

// upsert user (create if not exists)
authRouter.post('/upsert', async (req, res, next) => {
  try {
    const decoded = await verifyAuthHeader(req.headers.authorization as string);
    const { uid, email, name, picture } = decoded;

    const role = req.body?.role as ('CANDIDATE'|'INTERVIEWER'|'ADMIN'|undefined);

    const user = await prisma.user.upsert({
      where: { firebaseUid: uid },
      update: { name: name ?? undefined, image: picture ?? undefined, role: role ?? undefined },
      create: {
        firebaseUid: uid,
        email: email!,
        name: name ?? null,
        image: picture ?? null,
        // role defaults to CANDIDATE in schema
      },
    });

    res.json({ ok: true, user });
  } catch (e) { next(e); }
});

// who am I
authRouter.get('/me', async (req, res, next) => {
  try {
    const decoded = await verifyAuthHeader(req.headers.authorization as string);
    const me = await prisma.user.findUnique({ where: { firebaseUid: decoded.uid } });
    res.json({ ok: true, user: me, decoded });
  } catch (e) { next(e); }
});
authRouter.post('/role', async (req, res, next) => {
  try {
    const dec = await verifyAuthHeader(req.headers.authorization as string);
    const user = await prisma.user.update({
      where: { firebaseUid: dec.uid },
      data: { role: req.body.role }, // 'ADMIN' | 'INTERVIEWER' | 'CANDIDATE'
    });
    res.json({ ok: true, user });
  } catch (e) { next(e); }
});

