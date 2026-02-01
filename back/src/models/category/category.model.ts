import { ObjectId } from "mongoose";
import categoryModel from "./category.mongo";

export interface CategoryInterface {
  name: string,
  slug: string,
  id: string,
}

export async function saveCategory(data: any) {
  try {
    const category = new categoryModel(data)

    return await category.save();
  } catch (err) {
    console.warn(err)
    throw err
  }
}

export async function updateCategory(id: string, update: Partial<CategoryInterface>) {
  return categoryModel
    .findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true
    })
}

export async function findCategoryById(id?: ObjectId) {
  return await categoryModel.findById(id)
}

export async function findCategoryBySlug(slug: string) {
  return await categoryModel.findOne({slug})
}

export async function findCategories() {
  return await categoryModel.find()
}

export async function deleteCategory(id: string) {
  return await categoryModel.findByIdAndDelete(id)
}