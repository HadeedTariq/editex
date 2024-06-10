import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ProjectDocument extends Document {
  name: string;
  creator: Types.ObjectId;
  reader: Types.ObjectId[];
  contributor: Types.ObjectId[];
  public: boolean;
  password?: string;
}

export const projectSchema = new Schema<ProjectDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    contributor: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    public: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Project = mongoose.model<ProjectDocument>(
  'Project',
  projectSchema,
);
