import { Router, Response } from 'express';
import { Group } from '../models/Group';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/groups — todos los grupos (para el selector de login)
router.get('/', async (_req, res: Response): Promise<void> => {
  const groups = await Group.find().select('_id name description');
  res.json(groups);
});

// GET /api/groups/:id — grupo por ID
router.get('/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const group = await Group.findById(req.params.id);
  if (!group) {
    res.status(404).json({ message: 'Grupo no encontrado' });
    return;
  }
  res.json(group);
});

export default router;
