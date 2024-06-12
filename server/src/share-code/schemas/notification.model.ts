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
});

export const Notification = model('Notification', notificationSchema);
