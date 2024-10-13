import prisma from '@/lib/db';

export async function deleteAllRecords() {
  try {
    // Delete all records from each model
    await prisma.newPlantShares.deleteMany({});
    await prisma.monthlyContribution.deleteMany({});
    await prisma.entranceFee.deleteMany({});
    await prisma.payment.deleteMany({});
    await prisma.nominee.deleteMany({});
    await prisma.member.deleteMany({});

    console.log('All records deleted from the database');
  } catch (error) {
    console.error('Error deleting records:', error);
  }
}
