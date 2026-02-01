import mongoose from 'mongoose';
const { Schema, model, Type } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
})

export default model('Category', categorySchema);