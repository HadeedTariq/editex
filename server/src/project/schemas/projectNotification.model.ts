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
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'ProjectItem',
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
