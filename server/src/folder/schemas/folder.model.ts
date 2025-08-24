import { Schema, model } from 'mongoose';

const projectItemSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['file', 'folder'], required: true },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'ProjectItem',
      default: null,
    },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String },
  },
  { timestamps: true },
);

// Prevent duplicate names within the same folder
projectItemSchema.index(
  { name: 1, parentId: 1, projectId: 1 },
  { unique: true },
);

export const ProjectItem = model('ProjectItem', projectItemSchema);
