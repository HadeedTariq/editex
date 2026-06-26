import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ProjectDocument extends Document {
  name: string;
  creator: Types.ObjectId;
  contributor: Types.ObjectId[];
  public: boolean;
  password?: string;
}

export const projectSchema = new Schema<ProjectDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 1,
      maxlength: 100,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    contributor: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    password: {
      type: String,
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

// One user cannot create two projects having the same name.
projectSchema.index(
  {
    creator: 1,
    name: 1,
  },
  {
    unique: true,
  },
);

// Quickly fetch all projects of a user.
projectSchema.index({
  creator: 1,
});

// Quickly lookup contributors.
projectSchema.index({
  contributor: 1,
});

export const Project = mongoose.model<ProjectDocument>(
  'Project',
  projectSchema,
);
