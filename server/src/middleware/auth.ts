import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
  userGroupId?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token requerido' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
      groupId: string;
    };
    req.userId = payload.userId;
    req.userRole = payload.role;
    req.userGroupId = payload.groupId;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      res.status(403).json({ message: 'Sin permisos suficientes' });
      return;
    }
    next();
  };
}
