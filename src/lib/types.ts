import { z } from 'zod';

// Helper function to convert string to non-negative number
const stringToNonNegativeNumber = z
  .string()
  .refine((val) => !isNaN(Number(val)), {
    message: 'Invalid number format',
  })
  .transform((val) => {
    const numberValue = Number(val);
    if (numberValue < 0) {
      throw new Error('Number must be non-negative');
    }
    return numberValue;
  });

// Zod schemas
export const NomineeSchema = z.object({
  nomineeName: z.string().optional(),
  nomineeIdNo: z.string().optional(),
  nomineeRelationship: z.string().optional(),
  nomineeAddress: z.string().optional(),
  nomineeTelNo: z.string().optional(),
});

export const PaymentSchema = z.object({
  receiptNo: z.string(),
  amount: z.number().nonnegative().optional(),
});

export const EntranceFeeSchema = z.object({
  entranceMonthlyDeduction: stringToNonNegativeNumber,
  entranceAlreadyPaid: stringToNonNegativeNumber,
  entranceExpected: stringToNonNegativeNumber,
});

// Monthly Contribution Schema
export const MonthlyContributionSchema = z.object({
  monthlyNormal: stringToNonNegativeNumber,
  monthlyOverride: stringToNonNegativeNumber,
  monthlyOverrideBal: stringToNonNegativeNumber,
});

// New Plant Shares Schema
export const NewPlantSharesSchema = z.object({
  newPlantMonthlyDeduction: stringToNonNegativeNumber,
  newPlantAlreadyPaid: stringToNonNegativeNumber,
  newPlantExpected: stringToNonNegativeNumber,
  newPlantCertificateNo: z.string().optional(),
});

export const MemberSchema = z.object({
  membershipNo: z.string(),
  name: z.string(),

  dob: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),
  salutation: z.enum(['Mr', 'Mrs', 'Ms', 'Dr']),
  sex: z.enum(['M', 'F']),

  dateJoined: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),

  collectionCentre: z.string(),
  kraPin: z.string().optional(),
  address: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().email().optional(),
  bank: z.string().optional(),
  bankAc: z.string().optional(),
  division: z.string().optional(),
  noOfCows: z.string().transform((val) => {
    const number = parseInt(val, 10);
    if (isNaN(number) || number < 0)
      throw new Error('Expected a non-negative integer');
    return number;
  }),
  cowsInMilk: z.string().transform((val) => {
    const number = parseInt(val, 10);
    if (isNaN(number) || number < 0)
      throw new Error('Expected a non-negative integer');
    return number;
  }),

  nationalIdNo: z.string(),

  nhifNo: z.string().optional(),

  nhifAmt: z.string().transform((val) => {
    const number = parseFloat(val);
    if (isNaN(number) || number < 0)
      throw new Error('Expected a non-negative number');
    return number;
  }),

  village: z.string().optional(),
  location: z.string().optional(),
  subLocation: z.string().optional(),

  dateOfLeaving: z
    .string()
    .refine((val) => val === '' || !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => (val === '' ? null : new Date(val)))
    .optional(),

  creditLimit: z.string().transform((val) => {
    const number = parseFloat(val);
    if (isNaN(number) || number < 0)
      throw new Error('Expected a non-negative number');
    return number;
  }),
  currentCreditUsed: z.string().transform((val) => {
    const number = parseFloat(val);
    if (isNaN(number) || number < 0)
      throw new Error('Expected a non-negative number');
    return number;
  }),

  membershipStatus: z.enum(['Active', 'Inactive']),
  statusDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),

  proposers: z.string().optional(),
  comments: z.string().optional(),
  sharesPaid: z
    .string()
    .transform((val) => {
      const number = parseInt(val, 10);
      if (isNaN(number) || number < 0)
        throw new Error('Expected a non-negative integer');
      return number;
    })
    .optional(),
  nominee: NomineeSchema.optional(),
  payments: z.array(PaymentSchema).optional(),
  entranceFee: EntranceFeeSchema.optional(),
  monthlyContribution: MonthlyContributionSchema.optional(),
  newPlantShares: NewPlantSharesSchema.optional(),
});

export type TMember = {
  id: string;
  address: string | null;
  membershipNo: string;
  name: string;
  dob: Date;
  salutation: string;
  sex: string;
  dateJoined: Date;
  collectionCentre: string;
  kraPin: string | null;
  telephone: string | null;
  email: string | null;
  bank: string | null;
  bankAc: string | null;
  division: string | null;
  noOfCows: number;
  cowsInMilk: number;
  nationalIdNo: string | null;
  nhifNo: string | null;
  nhifAmt: number;
  village: string | null;
  location: string | null;
  subLocation: string | null;
  dateOfLeaving: Date | null;
  creditLimit: number;
  currentCreditUsed: number;
  membershipStatus: string;
  statusDate: Date | null;
  proposers: string | null;
  comments: string | null;
  sharesPaid: number | null;
};

export type InitialFormData = {
  id: string;
  membershipNo: string;
  name: string;
  dob: string;
  salutation: string;
  sex: string;
  dateJoined: string;
  collectionCentre: string;
  kraPin: string;
  address: string;
  telephone: string;
  email: string;
  bank: string;
  bankAc: string;
  division: string;
  noOfCows: number;
  cowsInMilk: number;
  nationalIdNo: string;
  nhifNo: string;
  nhifAmt: number;
  village: string;
  location: string;
  subLocation: string;
  dateOfLeaving: string;
  creditLimit: number;
  currentCreditUsed: number;
  nomineeName: string;
  nomineeIdNo: string;
  nomineeRelationship: string;
  nomineeAddress: string;
  nomineeTelNo: string;
  membershipStatus: string;
  statusDate: string;
  proposers: string;
  comments: string;
  receiptNo1: string;
  amount1: number;
  receiptNo2: string;
  amount2: number;
  receiptNo3: string;
  amount3: number;
  sharesPaid: number;
  balance: number;
  entranceMonthlyDeduction: number;
  entranceAlreadyPaid: number;
  entranceExpected: number;
  monthlyNormal: number;
  monthlyOverride: number;
  monthlyOverrideBal: number;
  newPlantMonthlyDeduction: number;
  newPlantAlreadyPaid: number;
  newPlantExpected: number;
  newPlantCertificateNo: string;
};

export type TMemberSchema = z.infer<typeof MemberSchema>;
