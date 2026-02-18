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