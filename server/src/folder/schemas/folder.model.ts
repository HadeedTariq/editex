import { Schema, model } from 'mongoose';

//! When a user create a folder\file in root of the project than only create function for this item schema is call But when the user create a subFolder\subFile in a folder then we find folder id and push the created folder/file with {name,isFolder,items} in the item schema items array

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
  items: [],
});
export const Item = model('Item', itemSchema);
