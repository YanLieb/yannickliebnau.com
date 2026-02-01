import mongoose, { Schema, Types, model, models } from 'mongoose';

export interface ProjectInterface {
  title: string;
  slug: string;
  description: string;
  link: string;
  featured: boolean;
  categories: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectModel = new Schema<ProjectInterface>(
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
    description: {
      type: String,
      required: [true, 'Please provide a project description'],
      trim: true,
    },
    link: {
      type: String,
      required: [true, 'Please provide a project link'],
      trim: true,
    },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: 'Category',
      required: [true, 'Please select at least one category']
    },
    featured: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

// Prevent model compilation error in development
const Project = models.Project || model<ProjectInterface>('Project', ProjectModel);

export default Project;
