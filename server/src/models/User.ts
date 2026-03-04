import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'treasurer' | 'parent';
  groupId: Types.ObjectId;
  studentIds?: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'treasurer', 'parent'], required: true },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    studentIds: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
