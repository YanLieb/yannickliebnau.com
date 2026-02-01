import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ZodError } from 'zod';
import Project from '@/models/Project';
import { projectSchema } from '@/schemas/project.schema';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const { slug } = await params;
    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    const existingProject = await Project.findOne({ slug });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    if (
      validatedData.slug &&
      validatedData.slug !== slug
    ) {
      const slugConflict = await Project.exists({
        slug: validatedData.slug,
        _id: { $ne: existingProject._id },
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: 'A project with this slug already exists' },
          { status: 409 }
        );
      }
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: existingProject._id },
      validatedData,
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { message: 'Project updated successfully', project: updatedProject },
      { status: 200 }
    );
  } catch (error: any) {
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

    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();

  const { slug } = await params;
  const project = await Project.findOne({ slug });

  if (!project) {
    return NextResponse.json(
      { error: 'No project with this slug' },
      { status: 404 }
    );
  }

  return NextResponse.json(project);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();

  const { slug } = await params;

  const deleteResult = await Project.deleteOne({ slug });

  if (deleteResult.deletedCount === 0) {
    return NextResponse.json(
      { error: 'No project with this slug' },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: 'Project deleted' },
    { status: 200 }
  );
}
