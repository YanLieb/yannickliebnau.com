import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ZodError } from 'zod';
import Category from '@/models/Category';
import { categorySchema } from '@/schemas/category.schema';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await dbConnect();

    const { slug } = await context.params;
    const body = await request.json();
    const validatedData = categorySchema.parse(body);

    const existingCategory = await Category.findOne({ slug });

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 },
      );
    }

    if (validatedData.slug && validatedData.slug !== slug) {
      const slugConflict = await Category.exists({
        slug: validatedData.slug,
        _id: { $ne: existingCategory._id },
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: 'A category with this slug already exists' },
          { status: 409 },
        );
      }
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: existingCategory._id },
      validatedData,
      { new: true, runValidators: true },
    );

    return NextResponse.json(
      { message: 'Category updated successfully', category: updatedCategory },
      { status: 200 },
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      const errors = error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 },
      );
    }

    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  await dbConnect();

  const { slug } = await context.params;
  const category = await Category.findOne({ slug });

  if (!category) {
    return NextResponse.json(
      { error: 'No category with this slug' },
      { status: 404 },
    );
  }

  return NextResponse.json(category);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  await dbConnect();

  const { slug } = await context.params;

  const deleteResult = await Category.deleteOne({ slug });

  if (deleteResult.deletedCount === 0) {
    return NextResponse.json(
      { error: 'No category with this slug' },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: 'Category deleted' }, { status: 200 });
}
