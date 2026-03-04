import { Schema, model, Document, Types } from 'mongoose';

export interface IPayment extends Document {
  studentId: Types.ObjectId;
  month: number;
  amount: number;
  status: 'paid' | 'overdue';
  groupId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    month: { type: Number, required: true, min: 1, max: 12 },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['paid', 'overdue'], required: true },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  },
  { timestamps: true }
);

export const Payment = model<IPayment>('Payment', paymentSchema);
