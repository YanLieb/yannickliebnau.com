import mongoose, { Schema, model, models } from 'mongoose';

export interface UserInterface {
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  role: string;
}

const UserModel = new Schema<UserInterface>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["admin", "editor"],
      default: "viewer"
    }
  },
);

// Prevent model compilation error in development
const User = models.User || model<UserInterface>('User', UserModel);

export default User;
