import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Group } from '../models/Group';
import { Student } from '../models/Student';
import { Payment } from '../models/Payment';
import { User } from '../models/User';

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI no definido en .env');

  await mongoose.connect(uri);
  console.log('Conectado a MongoDB');

  // Limpiar colecciones previas
  await Promise.all([
    Group.deleteMany({}),
    Student.deleteMany({}),
    Payment.deleteMany({}),
    User.deleteMany({}),
  ]);
  console.log('Colecciones limpiadas');

  // --- Grupos ---
  const [group1, group2] = await Group.insertMany([
    { name: 'Primaria 3er Grado A', description: 'Grupo de tercer grado de primaria, sección A' },
    { name: 'Secundaria 1er Año B', description: 'Grupo de primer año de secundaria, sección B' },
  ]);
  console.log('Grupos creados');

  // --- Estudiantes ---
  const [maria, juan, ana, carlos, laura, pedro, sofia, diego, valentina, mateo] =
    await Student.insertMany([
      { name: 'María González',   groupId: group1._id, parentEmail: 'padre@grupo1.com' },
      { name: 'Juan Pérez',       groupId: group1._id, parentEmail: 'padre@grupo1.com' },
      { name: 'Ana Martínez',     groupId: group1._id },
      { name: 'Carlos Rodríguez', groupId: group1._id },
      { name: 'Laura Fernández',  groupId: group1._id },
      { name: 'Pedro Sánchez',    groupId: group2._id },
      { name: 'Sofía López',      groupId: group2._id },
      { name: 'Diego Ramírez',    groupId: group2._id },
      { name: 'Valentina Torres', groupId: group2._id },
      { name: 'Mateo Flores',     groupId: group2._id },
    ]);
  console.log('Estudiantes creados');

  // --- Pagos ---
  await Payment.insertMany([
    // Grupo 1
    { studentId: maria._id,     month: 1, amount: 150, status: 'paid',    groupId: group1._id },
    { studentId: juan._id,      month: 1, amount: 150, status: 'paid',    groupId: group1._id },
    { studentId: ana._id,       month: 1, amount: 0,   status: 'overdue', groupId: group1._id },
    { studentId: maria._id,     month: 2, amount: 150, status: 'paid',    groupId: group1._id },
    { studentId: juan._id,      month: 2, amount: 0,   status: 'overdue', groupId: group1._id },
    { studentId: carlos._id,    month: 2, amount: 150, status: 'paid',    groupId: group1._id },
    { studentId: maria._id,     month: 3, amount: 150, status: 'paid',    groupId: group1._id },
    { studentId: ana._id,       month: 3, amount: 150, status: 'paid',    groupId: group1._id },
    { studentId: laura._id,     month: 3, amount: 150, status: 'paid',    groupId: group1._id },
    // Grupo 2
    { studentId: pedro._id,     month: 1, amount: 200, status: 'paid',    groupId: group2._id },
    { studentId: sofia._id,     month: 1, amount: 200, status: 'overdue', groupId: group2._id },
    { studentId: pedro._id,     month: 2, amount: 200, status: 'paid',    groupId: group2._id },
    { studentId: diego._id,     month: 2, amount: 200, status: 'paid',    groupId: group2._id },
    { studentId: valentina._id, month: 3, amount: 200, status: 'overdue', groupId: group2._id },
    { studentId: mateo._id,     month: 3, amount: 200, status: 'paid',    groupId: group2._id },
  ]);
  console.log('Pagos creados');

  // --- Usuarios (contraseñas hasheadas) ---
  const hash = (pw: string) => bcrypt.hash(pw, 10);

  await User.insertMany([
    {
      email: 'admin@sistema.com',
      password: await hash('admin123'),
      name: 'Administrador del Sistema',
      role: 'admin',
      groupId: group1._id,
    },
    {
      email: 'tesorero@grupo1.com',
      password: await hash('password123'),
      name: 'Roberto Gómez',
      role: 'treasurer',
      groupId: group1._id,
    },
    {
      email: 'padre@grupo1.com',
      password: await hash('password123'),
      name: 'Padre de María y Juan',
      role: 'parent',
      groupId: group1._id,
      studentIds: [maria._id, juan._id],
    },
    {
      email: 'tesorero@grupo2.com',
      password: await hash('password123'),
      name: 'Patricia Ruiz',
      role: 'treasurer',
      groupId: group2._id,
    },
    {
      email: 'padre@grupo2.com',
      password: await hash('password123'),
      name: 'Padre de Pedro',
      role: 'parent',
      groupId: group2._id,
      studentIds: [pedro._id],
    },
  ]);
  console.log('Usuarios creados');

  console.log('\n✓ Seed completado exitosamente');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Error en seed:', err);
  process.exit(1);
});
