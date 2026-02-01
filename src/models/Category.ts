import mongoose, { Schema, model, models } from 'mongoose';

export interface CategoryInterface {
  title: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategoryModel = new Schema<CategoryInterface>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a project slug'],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model compilation error in development
const Category = models.Category || model<CategoryInterface>('Category', CategoryModel);

export default Category;
