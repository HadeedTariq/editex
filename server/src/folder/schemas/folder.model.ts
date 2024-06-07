import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isFolder: {
    type: Boolean,
    required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      name: String,
      isFolder: Boolean,
    },
  ],
  code: String,
});

itemSchema.index({ name: 1, projectId: 1 }, { unique: true });

export const Item = model('Item', itemSchema);
