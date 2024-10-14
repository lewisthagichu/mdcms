import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

// GET /api/members/:id
export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    if (!id) {
      return new Response('ID is required', { status: 400 });
    }

    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        nominee: true,
        payments: true,
        entranceFee: true,
        monthlyContribution: true,
        newPlantShares: true,
      },
    });

    revalidatePath('/');
    return new Response(JSON.stringify({ member }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    // Check if the error is an instance of Error
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response('error: ' + errorMessage, { status: 500 });
  }
};

// DELETE /api/members/:id
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    if (!id) {
      return new Response('ID is required', { status: 400 });
    }

    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        nominee: true,
        payments: true,
        entranceFee: true,
        monthlyContribution: true,
        newPlantShares: true,
      },
    });

    if (member) {
      await prisma.nominee.deleteMany({ where: { memberId: id } });
      await prisma.payment.deleteMany({ where: { memberId: id } });
      await prisma.entranceFee.delete({ where: { memberId: id } });
      await prisma.monthlyContribution.delete({ where: { memberId: id } });
      await prisma.newPlantShares.delete({ where: { memberId: id } });
    }

    await prisma.member.delete({ where: { id } });

    revalidatePath('/');
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    // Check if the error is an instance of Error
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response('error: ' + errorMessage, { status: 500 });
  }
};
