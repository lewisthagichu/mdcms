import { MemberSchema } from '@/lib/types';

type FormDataObject = {
  [key: string]: FormDataEntryValue | undefined;
};

export function mapPayments(formDataObj: FormDataObject) {
  const payments = [];

  for (let i = 1; i <= 3; i++) {
    const receiptNo = formDataObj[`receiptNo${i}`];
    const amount = formDataObj[`amount${i}`];

    if (receiptNo && amount) {
      payments.push({
        receiptNo: receiptNo as string,
        amount: parseFloat(amount.toString()),
      });
    }
  }

  return payments;
}

export function validateData(formDataObj: FormDataObject) {
  return MemberSchema.parse({
    ...formDataObj,
    nominee: {
      nomineeName: formDataObj.nomineeName,
      nomineeIdNo: formDataObj.nomineeIdNo,
      nomineeRelationship: formDataObj.nomineeRelationship,
      nomineeAddress: formDataObj.nomineeAddress,
      nomineeTelNo: formDataObj.nomineeTelNo,
    },
    entranceFee: {
      entranceMonthlyDeduction: formDataObj.entranceMonthlyDeduction,
      entranceAlreadyPaid: formDataObj.entranceAlreadyPaid,
      entranceExpected: formDataObj.entranceExpected,
    },
    monthlyContribution: {
      monthlyNormal: formDataObj.monthlyNormal,
      monthlyOverride: formDataObj.monthlyOverride,
      monthlyOverrideBal: formDataObj.monthlyOverrideBal,
    },
    newPlantShares: {
      newPlantMonthlyDeduction: formDataObj.newPlantMonthlyDeduction,
      newPlantAlreadyPaid: formDataObj.newPlantAlreadyPaid,
      newPlantExpected: formDataObj.newPlantExpected,
      newPlantCertificateNo: formDataObj.newPlantCertificateNo,
    },
    payments: mapPayments(formDataObj),
  });
}
