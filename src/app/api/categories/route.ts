import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import { categorySchema } from '@/schemas/category.schema';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate with Zod
    const validatedData = categorySchema.parse(body);

    // Create new category with validated data
    const category = await Category.create(validatedData);

    return NextResponse.json(
      { message: 'Category created successfully', category },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const errors = error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      );
    }

    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A category with this slug already exists' },
        { status: 409 }
      );
    }

    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { categories },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching categorys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categorys' },
      { status: 500 }
    );
  }
}
