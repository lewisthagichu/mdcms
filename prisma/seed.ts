import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const initiaPost: Prisma.MemberCreateInput[] = [
  {
    membershipNo: 'M001',
    name: 'John Doe',
    dob: new Date('1980-01-01'),
    salutation: 'Mr',
    sex: 'M',
    dateJoined: new Date('2023-01-01'),
    collectionCentre: '1A',
    kraPin: 'A123456789B',
    address: '123 Main St, Nairobi',
    telephone: '+254700000000',
    email: 'john.doe@example.com',
    bank: 'Equity Bank',
    bankAc: '1234567890',
    division: 'Central',
    noOfCows: 5,
    cowsInMilk: 3,
    nationalIdNo: '12345678',
    nhifNo: 'NHIF001',
    nhifAmt: 500,
    village: 'Greenville',
    location: 'Nairobi',
    subLocation: 'Westlands',
    creditLimit: 10000,
    currentCreditUsed: 5000,
    membershipStatus: 'Active',
    statusDate: new Date('2023-01-01'),
    proposers: 'Jane Smith, Mike Johnson',
    comments: 'Reliable member',
    sharesPaid: 1000,
    nominee: {
      create: {
        nomineeName: 'Jane Doe',
        nomineeIdNo: '87654321',
        nomineeRelationship: 'Spouse',
        nomineeAddress: '123 Main St, Nairobi',
        nomineeTelNo: '+254711111111',
      },
    },
    payments: {
      create: [
        { receiptNo: 'R001', amount: 1000 },
        { receiptNo: 'R002', amount: 1500 },
      ],
    },
    entranceFee: {
      create: {
        entranceMonthlyDeduction: 100,
        entranceAlreadyPaid: 300,
        entranceExpected: 1000,
      },
    },
    monthlyContribution: {
      create: {
        monthlyNormal: 500,
        monthlyOverride: 0,
        monthlyOverrideBal: 0,
      },
    },
    newPlantShares: {
      create: {
        newPlantMonthlyDeduction: 200,
        newPlantAlreadyPaid: 600,
        newPlantExpected: 2000,
        newPlantCertificateNo: 'NPS001',
      },
    },
  },
];

async function main() {
  console.log('Start seeding...');

  for (const post of initiaPost) {
    const newPost = await prisma.member.create({
      data: post,
    });

    console.log(`Created post with id ${newPost.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
