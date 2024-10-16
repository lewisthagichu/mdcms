type Payment = {
  receiptNo: string;
  amount: number;
};

const initialFormData = {
  membershipNo: '',
  name: '',
  dob: '',
  salutation: '',
  sex: '',
  dateJoined: '',
  collectionCentre: '',
  kraPin: '',
  address: '',
  telephone: '',
  email: '',
  bank: '',
  bankAc: '',
  division: '',
  noOfCows: 0,
  cowsInMilk: 0,
  nationalIdNo: '',
  nhifNo: '',
  nhifAmt: 0,
  village: '',
  location: '',
  subLocation: '',
  dateOfLeaving: '',
  creditLimit: 0,
  currentCreditUsed: 0,
  nominee: {
    nomineeName: '',
    nomineeIdNo: '',
    nomineeRelationship: '',
    nomineeAddress: '',
    nomineeTelNo: '',
  },
  membershipStatus: '',
  statusDate: '',
  proposers: '',
  comments: '',
  payments: [
    { receiptNo: '', amount: 0 },
    { receiptNo: '', amount: 0 },
    { receiptNo: '', amount: 0 },
  ],
  sharesPaid: 0,
  balance: 0,
  entranceFee: {
    entranceMonthlyDeduction: 0,
    entranceAlreadyPaid: 0,
    entranceExpected: 0,
  },
  monthlyContribution: {
    monthlyNormal: 0,
    monthlyOverride: 0,
    monthlyOverrideBal: 0,
  },
  newPlantShares: {
    newPlantMonthlyDeduction: 0,
    newPlantAlreadyPaid: 0,
    newPlantExpected: 0,
    newPlantCertificateNo: '',
  },
};

// Sums payment amounts and shares paid properties to balance property
export function updateBalance(member: typeof initialFormData): number {
  const payments = member.payments || [];

  const totalPayments = payments.reduce(
    (acc: number, payment: Payment) => acc + (payment.amount || 0),
    0
  );

  const totalBalance = totalPayments + (member.sharesPaid || 0);

  return totalBalance;
}

// Converts ISO date to YYY-MM-DD format
export function formatDateToYyyyMmDd(isoDate: string): string {
  if (!isoDate) return '';

  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// AddMemberForm.tsx: Same as updateBalance func but is called as user inputs data
export const calculateBalance = (data: any) => {
  return (
    Number(data.amount1) +
    Number(data.amount2) +
    Number(data.amount3) +
    Number(data.sharesPaid)
  );
};

// Convert payment array items to member obj properties
function convertPaymentsToProps(member: any) {
  const { payments, ...memberWithoutPayments } = member;
  const updatedMember = { ...memberWithoutPayments };

  payments.forEach((payment: Payment, index: number) => {
    const paymentIndex = index + 1;

    updatedMember[`receiptNo${paymentIndex}`] = payment.receiptNo;
    updatedMember[`amount${paymentIndex}`] = payment.amount;
  });

  return updatedMember;
}

// Flatten nested objects
function flattenMemberObj(member: typeof initialFormData) {
  const {
    nominee,
    entranceFee,
    monthlyContribution,
    newPlantShares,
    ...memberWithoutNested
  } = member;

  const flattenedMember = {
    ...memberWithoutNested,
    nomineeName: nominee.nomineeName,
    nomineeIdNo: nominee.nomineeIdNo,
    nomineeRelationship: nominee.nomineeRelationship,
    nomineeAddress: nominee.nomineeAddress,
    nomineeTelNo: nominee.nomineeTelNo,
    entranceMonthlyDeduction: entranceFee.entranceMonthlyDeduction,
    entranceAlreadyPaid: entranceFee.entranceAlreadyPaid,
    entranceExpected: entranceFee.entranceExpected,
    monthlyNormal: monthlyContribution.monthlyNormal,
    monthlyOverride: monthlyContribution.monthlyOverride,
    monthlyOverrideBal: monthlyContribution.monthlyOverrideBal,
    newPlantMonthlyDeduction: newPlantShares.newPlantMonthlyDeduction,
    newPlantAlreadyPaid: newPlantShares.newPlantAlreadyPaid,
    newPlantExpected: newPlantShares.newPlantExpected,
    newPlantCertificateNo: newPlantShares.newPlantCertificateNo,
  };

  return flattenedMember;
}

export const formatMemberObj = (member: typeof initialFormData) => {
  let updatedMember;
  updatedMember = {
    ...member,
    dob: formatDateToYyyyMmDd(member.dob),
    dateJoined: formatDateToYyyyMmDd(member.dateJoined),
    dateOfLeaving: formatDateToYyyyMmDd(member.dateOfLeaving),
    statusDate: formatDateToYyyyMmDd(member.statusDate),
    balance: updateBalance(member),
  };

  updatedMember = convertPaymentsToProps(updatedMember);
  updatedMember = flattenMemberObj(updatedMember);

  return updatedMember;
};
