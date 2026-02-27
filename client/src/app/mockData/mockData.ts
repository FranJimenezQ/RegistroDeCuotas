import { Student, Payment, Group } from '../interfaces/interfaces';

// Grupos de ejemplo
export const mockGroups: Group[] = [
  {
    id: 'group1',
    name: 'Primaria 3er Grado A',
    description: 'Grupo de tercer grado de primaria, sección A'
  },
  {
    id: 'group2',
    name: 'Secundaria 1er Año B',
    description: 'Grupo de primer año de secundaria, sección B'
  }
];

// Estudiantes por grupo
export const mockStudents: Student[] = [
  // Grupo 1
  { id: '1', name: 'María González', groupId: 'group1', parentEmail: 'padre@grupo1.com' },
  { id: '2', name: 'Juan Pérez', groupId: 'group1', parentEmail: 'padre@grupo1.com' },
  { id: '3', name: 'Ana Martínez', groupId: 'group1' },
  { id: '4', name: 'Carlos Rodríguez', groupId: 'group1' },
  { id: '5', name: 'Laura Fernández', groupId: 'group1' },
  
  // Grupo 2
  { id: '6', name: 'Pedro Sánchez', groupId: 'group2' },
  { id: '7', name: 'Sofía López', groupId: 'group2' },
  { id: '8', name: 'Diego Ramírez', groupId: 'group2' },
  { id: '9', name: 'Valentina Torres', groupId: 'group2' },
  { id: '10', name: 'Mateo Flores', groupId: 'group2' },
];

// Pagos de ejemplo
export const mockPayments: Payment[] = [
  // Grupo 1
  { studentId: '1', month: 1, amount: 150.00, status: 'paid', groupId: 'group1' },
  { studentId: '2', month: 1, amount: 150.00, status: 'paid', groupId: 'group1' },
  { studentId: '3', month: 1, amount: 0.00, status: 'overdue', groupId: 'group1' },
  { studentId: '1', month: 2, amount: 150.00, status: 'paid', groupId: 'group1' },
  { studentId: '2', month: 2, amount: 0.00, status: 'overdue', groupId: 'group1' },
  { studentId: '4', month: 2, amount: 150.00, status: 'paid', groupId: 'group1' },
  { studentId: '1', month: 3, amount: 150.00, status: 'paid', groupId: 'group1' },
  { studentId: '3', month: 3, amount: 150.00, status: 'paid', groupId: 'group1' },
  { studentId: '5', month: 3, amount: 150.00, status: 'paid', groupId: 'group1' },
  
  // Grupo 2
  { studentId: '6', month: 1, amount: 200.00, status: 'paid', groupId: 'group2' },
  { studentId: '7', month: 1, amount: 200.00, status: 'overdue', groupId: 'group2' },
  { studentId: '6', month: 2, amount: 200.00, status: 'paid', groupId: 'group2' },
  { studentId: '8', month: 2, amount: 200.00, status: 'paid', groupId: 'group2' },
  { studentId: '9', month: 3, amount: 200.00, status: 'overdue', groupId: 'group2' },
  { studentId: '10', month: 3, amount: 200.00, status: 'paid', groupId: 'group2' },
];

// Usuarios simulados
export const mockUsers = {
  // Administrador del sistema
  'admin@sistema.com': {
    id: 'admin1',
    email: 'admin@sistema.com',
    name: 'Administrador del Sistema',
    role: 'admin' as const,
    groupId: 'group1', // Puede acceder a todos los grupos
    password: 'admin123'
  },
  // Tesorero grupo 1
  'tesorero@grupo1.com': {
    id: 'user1',
    email: 'tesorero@grupo1.com',
    name: 'Roberto Gómez',
    role: 'treasurer' as const,
    groupId: 'group1',
    password: 'password123'
  },
  // Padre grupo 1
  'padre@grupo1.com': {
    id: 'user2',
    email: 'padre@grupo1.com',
    name: 'Padre de María y Juan',
    role: 'parent' as const,
    groupId: 'group1',
    studentIds: ['1', '2'],
    password: 'password123'
  },
  // Tesorero grupo 2
  'tesorero@grupo2.com': {
    id: 'user3',
    email: 'tesorero@grupo2.com',
    name: 'Patricia Ruiz',
    role: 'treasurer' as const,
    groupId: 'group2',
    password: 'password123'
  },
  // Padre grupo 2
  'padre@grupo2.com': {
    id: 'user4',
    email: 'padre@grupo2.com',
    name: 'Padre de Pedro',
    role: 'parent' as const,
    groupId: 'group2',
    studentIds: ['6'],
    password: 'password123'
  }
};
