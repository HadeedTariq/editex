import { Schema, model } from 'mongoose';

const projectNotificationSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  message: {
    type: String,
    required: true,
  },
  fileId: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const ProjectNotification = model(
  'ProjectNotification',
  projectNotificationSchema,
);
