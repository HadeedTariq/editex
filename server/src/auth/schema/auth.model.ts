import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  username: string;
  email: string;
  avatar?: string;
  password: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  passion: string;
}

export const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: false,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRhtuszppVVNDg2JDHofrs55RtFKjd8I9vNU_wzl2CMA&s',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    passion: {
      type: String,
      required: [true, 'Passion is required'],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model<UserDocument>('User', userSchema);
