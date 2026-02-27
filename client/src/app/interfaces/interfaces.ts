export interface Student {
    id: string;
    name: string;
    groupId: string;
    parentEmail?: string
}

export interface Payment {
    id?: string;
    studentId: string;
    month: number;
    amount: number;
    status: 'paid' | 'overdue';
    groupId: string;
    createdAt?: Date;
    updateAt?: Date
}

export interface Group {
    id: string;
    name: string;
    description: string;
    createdAt?: Date;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'parent' | 'treasurer';
    groupId: string;
    studentIds?: string[];
}

export interface AuthResponse {
    user: User;
    token: string;
    group: Group;
}