import { Schema, model } from 'mongoose';

const mergingRequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'ProjectItem',
  },
  code: {
    type: String,
    required: true,
  },
  isChanged: {
    type: Boolean,
    default: false,
  },
});

export const MergingRequest = model('MergeRequest', mergingRequestSchema);
