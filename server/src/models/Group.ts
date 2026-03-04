import { Schema, model, Document } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  description: string;
  createdAt: Date;
}

const groupSchema = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const Group = model<IGroup>('Group', groupSchema);
