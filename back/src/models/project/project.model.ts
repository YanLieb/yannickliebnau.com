import { ObjectId } from "mongoose";
import projectModel from "./project.mongo";

export interface ProjectInterface {
  id: string,
  title: string,
  slug: string,
  description: string,
  link: string,
  categories: string[]
}

export async function saveProject(data: ProjectInterface) {
  try {
    const project = new projectModel(data)

    return await project.save();
  } catch (err) {
    console.warn(err)
    throw err
  }
}

export async function updateProject(id: string, update: Partial<ProjectInterface>) {
  return projectModel
    .findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true
    })
    .populate('categories');
}

export async function findProjectById(id?: ObjectId) {
  return await projectModel.findById(id).populate('categories')
}

export async function findProjectBySlug(slug: string) {
  return await projectModel.findOne({ slug }).populate('categories')
}

export async function findProjects() {
  return await projectModel.find()
}

export async function deleteProject(id: string) {
  return await projectModel.findByIdAndDelete(id)
}