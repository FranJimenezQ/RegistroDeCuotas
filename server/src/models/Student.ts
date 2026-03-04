import { Schema, model, Document, Types } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  groupId: Types.ObjectId;
  parentEmail?: string;
}

const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    parentEmail: { type: String, lowercase: true },
  },
  { timestamps: true }
);

export const Student = model<IStudent>('Student', studentSchema);
