type Payment = {
  receiptNo: string;
  amount: number;
};
export function updateBalance(member: any): number {
  const payments = member.payments || [];

  // Sum all amounts in the payments array
  const totalPayments = payments.reduce(
    (acc: number, payment: Payment) => acc + (payment.amount || 0),
    0
  );

  // Add sharesPaid to the total payments
  const totalBalance = totalPayments + (member.sharesPaid || 0);

  return totalBalance;
}

export function formatDateToYyyyMmDd(isoDate: string): string {
  if (!isoDate) return '';

  // Convert the ISO string to a Date object
  const date = new Date(isoDate);

  // Extract year, month, and day from the Date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  // Return the formatted date as YYYY-MM-DD
  return `${year}-${month}-${day}`;
}
