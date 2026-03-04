import { Router, Response } from 'express';
import { Student } from '../models/Student';
import { requireAuth, requireRole, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/students?groupId=... — estudiantes del grupo del usuario autenticado
router.get('/', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const groupId = req.userRole === 'admin' ? req.query.groupId : req.userGroupId;
  const students = await Student.find({ groupId });
  res.json(students);
});

// GET /api/students/:id
router.get('/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404).json({ message: 'Estudiante no encontrado' });
    return;
  }
  res.json(student);
});

// POST /api/students — solo treasurer o admin
router.post(
  '/',
  requireAuth,
  requireRole('treasurer', 'admin'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    const student = new Student({ ...req.body, groupId: req.userGroupId });
    await student.save();
    res.status(201).json(student);
  }
);

// PUT /api/students/:id — solo treasurer o admin
router.put(
  '/:id',
  requireAuth,
  requireRole('treasurer', 'admin'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      res.status(404).json({ message: 'Estudiante no encontrado' });
      return;
    }
    res.json(student);
  }
);

export default router;
