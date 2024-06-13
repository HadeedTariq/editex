import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
  reciever: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    required: true,
  },
  isWatch: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
});

export const Notification = model('Notification', notificationSchema);
