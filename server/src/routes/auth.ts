import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Group } from '../models/Group';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email y contraseña requeridos' });
    return;
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.status(401).json({ message: 'Credenciales inválidas' });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ message: 'Credenciales inválidas' });
    return;
  }

  const group = await Group.findById(user.groupId);

  const token = jwt.sign(
    { userId: user._id, role: user.role, groupId: user.groupId },
    process.env.JWT_SECRET!,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      groupId: user.groupId,
      studentIds: user.studentIds,
    },
    group,
  });
});

export default router;
