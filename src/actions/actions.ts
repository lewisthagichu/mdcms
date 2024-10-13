'use server';
import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { validateData } from '@/utils/validate';

export type FormState = {
  message: string;
  errors?: string;
};

export async function createMember(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const formDataObj = Object.fromEntries(formData);
    const validatedData = validateData(formDataObj);

    await prisma.member.create({
      data: {
        ...validatedData,
        nominee: { create: validatedData.nominee },
        payments: { create: validatedData.payments },
        entranceFee: { create: validatedData.entranceFee },
        monthlyContribution: { create: validatedData.monthlyContribution },
        newPlantShares: { create: validatedData.newPlantShares },
      },
    });
    revalidatePath('/');
    return { message: 'success' };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError;
      const errorMap = zodError.flatten().fieldErrors;
      return {
        message: 'Validation failed',
        errors: JSON.stringify(errorMap),
      };
    }
    return { message: 'An unexpected error occurred', errors: 'Server error' };
  }
}

export async function getMember(id: string) {
  try {
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
    if (!member) {
      return { success: false, error: 'Member not found' };
    }
    return { success: true, data: member };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// export async function updateMember(
//   id: string,
//   data: z.infer<typeof MemberSchema>
// ) {
//   try {
//     const validatedData = MemberSchema.parse(data);
//     const member = await prisma.member.update({
//       where: { id },
//       data: {
//         ...validatedData,
//         nominee: { update: validatedData.nominee },
//         payments: {
//           deleteMany: {},
//           create: validatedData.payments,
//         },
//         entranceFee: { update: validatedData.entranceFee },
//         monthlyContribution: { update: validatedData.monthlyContribution },
//         newPlantShares: { update: validatedData.newPlantShares },
//       },
//     });
//     revalidatePath('/');
//     return { success: true, data: member };
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return { success: false, error: error.errors };
//     }
//     return { success: false, error: 'An unexpected error occurred' };
//   }
// }
