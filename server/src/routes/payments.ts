import { Router, Response } from 'express';
import { Payment } from '../models/Payment';
import { requireAuth, requireRole, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/payments?month=1 — pagos del grupo (filtrables por mes)
router.get('/', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const filter: Record<string, unknown> = { groupId: req.userGroupId };
  if (req.query.month) filter.month = Number(req.query.month);
  if (req.query.studentId) filter.studentId = req.query.studentId;

  const payments = await Payment.find(filter);
  res.json(payments);
});

// GET /api/payments/:id
router.get('/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(404).json({ message: 'Pago no encontrado' });
    return;
  }
  res.json(payment);
});

// POST /api/payments — registrar pago (solo treasurer o admin)
router.post(
  '/',
  requireAuth,
  requireRole('treasurer', 'admin'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    const payment = new Payment({ ...req.body, groupId: req.userGroupId });
    await payment.save();
    res.status(201).json(payment);
  }
);

// PUT /api/payments/:id — actualizar pago (solo treasurer o admin)
router.put(
  '/:id',
  requireAuth,
  requireRole('treasurer', 'admin'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) {
      res.status(404).json({ message: 'Pago no encontrado' });
      return;
    }
    res.json(payment);
  }
);

export default router;
