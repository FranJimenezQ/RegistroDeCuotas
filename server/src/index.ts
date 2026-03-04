import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import groupRoutes from './routes/groups';
import studentRoutes from './routes/students';
import paymentRoutes from './routes/payments';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/payments', paymentRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
  });
