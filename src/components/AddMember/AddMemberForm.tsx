'use client';
import { useState, useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createMember } from '@/actions/actions';
import { calculateBalance } from '@/utils/formatMemberData';
import SubmitButton from '../common/SubmitButton';

const initialFormData = {
  membershipNo: 'M021',
  name: 'John Doe',
  dob: '1990-01-01',
  salutation: 'Mr',
  sex: 'M',
  dateJoined: '2023-01-01',
  collectionCentre: '1A',
  kraPin: 'A123456789B',
  address: '123 Main St, Nairobi',
  telephone: '+254700000000',
  email: 'john.doe@example.com',
  bank: 'equity',
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
  dateOfLeaving: '',
  creditLimit: 10000,
  currentCreditUsed: 5000,
  nomineeName: 'Jane Doe',
  nomineeIdNo: '87654321',
  nomineeRelationship: 'Spouse',
  nomineeAddress: '123 Main St, Nairobi',
  nomineeTelNo: '+254711111111',
  membershipStatus: 'Active',
  statusDate: '2023-01-01',
  proposers: 'Alice Smith, Bob Johnson',
  comments: 'New member',
  receiptNo1: 'R001',
  amount1: 1000,
  receiptNo2: 'R002',
  amount2: 1500,
  receiptNo3: 'R003',
  amount3: 2000,
  sharesPaid: 4000,
  balance: 0,
  entranceMonthlyDeduction: 100,
  entranceAlreadyPaid: 300,
  entranceExpected: 1000,
  monthlyNormal: 500,
  monthlyOverride: 0,
  monthlyOverrideBal: 0,
  newPlantMonthlyDeduction: 200,
  newPlantAlreadyPaid: 600,
  newPlantExpected: 2000,
  newPlantCertificateNo: 'NPS001',
};

export default function AddMemberForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(createMember, {
    message: '',
    errors: undefined,
  });
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (formState.message === 'success') {
      router.push('/');
    } else if (formState.errors) {
      try {
        const errorObj = JSON.parse(formState.errors);
        setFieldErrors(errorObj);
      } catch (e) {
        console.error('Error parsing error object:', e);
      }
    }
  }, [formState, router]);

  const handleExit = () => {
    if (
      window.confirm(
        'Are you sure you want to exit? Any unsaved changes will be lost.'
      )
    ) {
      router.push('/');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      if (['amount1', 'amount2', 'amount3', 'sharesPaid'].includes(name)) {
        newData.balance = calculateBalance(newData);
      }
      return newData;
    });
    // Clear the error for this field when the user starts typing
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const renderInput = (
    name: string,
    label: string,
    type: string = 'text',
    required: boolean = false
  ) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}:
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name as keyof typeof formData]}
        onChange={handleInputChange}
        required={required}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          fieldErrors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {fieldErrors[name] && (
        <p className="text-red-500 text-xs mt-1">{fieldErrors[name]}</p>
      )}
    </div>
  );

  const renderSelect = (
    name: string,
    label: string,
    options: { value: string; label: string }[],
    required: boolean = false
  ) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}:
      </label>
      <select
        id={name}
        name={name}
        value={formData[name as keyof typeof formData]}
        onChange={handleInputChange}
        required={required}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          fieldErrors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {fieldErrors[name] && (
        <p className="text-red-500 text-xs mt-1">{fieldErrors[name]}</p>
      )}
    </div>
  );

  console.log(formData);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderInput('membershipNo', 'Membership No', 'text', true)}
        {renderInput('name', 'Name', 'text', true)}
        {renderInput('dob', 'Date of birth', 'date', true)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderSelect(
          'salutation',
          'Salutation',
          [
            { value: 'Mr', label: 'Mr' },
            { value: 'Mrs', label: 'Mrs' },
            { value: 'Ms', label: 'Ms' },
            { value: 'Dr', label: 'Dr' },
          ],
          true
        )}
        {renderSelect('sex', 'Sex', [
          { value: 'M', label: 'Male' },
          { value: 'F', label: 'Female' },
        ])}
        {renderInput('dateJoined', 'Date Joined', 'date', true)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSelect('collectionCentre', 'Collection Centre', [
          { value: '1A', label: '1A' },
          { value: '2A', label: '2A' },
          { value: '3A', label: '3A' },
          { value: '4A', label: '4A' },
          { value: '5A', label: '5A' },
          { value: '6A', label: '6A' },
        ])}
        {renderInput('kraPin', 'KRA PIN')}
      </div>

      {renderInput('address', 'Address')}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('telephone', 'Telephone', 'tel')}
        {renderInput('email', 'Email', 'email')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSelect('bank', 'Bank', [
          { value: 'equity', label: 'Equity' },
          { value: 'family', label: 'Family Bank' },
          { value: 'cooperative', label: 'Cooperative' },
          { value: 'ncba', label: 'NCBA' },
        ])}
        {renderInput('bankAc', 'Bank A/c')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderInput('division', 'Division')}
        {renderInput('noOfCows', 'No of Cows', 'number')}
        {renderInput('cowsInMilk', 'Cows in Milk', 'number')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderInput('nationalIdNo', 'National ID No', 'text', true)}
        {renderInput('nhifNo', 'NHIF No')}
        {renderInput('nhifAmt', 'NHIF Amount', 'number')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderInput('village', 'Village')}
        {renderInput('location', 'Location')}
        {renderInput('subLocation', 'Sub-location')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderInput('dateOfLeaving', 'Date of Leaving', 'date')}
        {renderInput('creditLimit', 'Credit Limit', 'number')}
        {renderInput('currentCreditUsed', 'Current Credit Used', 'number')}
      </div>

      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="text-lg font-semibold text-gray-700 px-2">
          Nominee Information
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput('nomineeName', 'Nominee Name')}
          {renderInput('nomineeIdNo', 'Nominee ID No')}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {renderInput('nomineeRelationship', 'Relationship')}
          {renderInput('nomineeAddress', 'Nominee Address')}
          {renderInput('nomineeTelNo', 'Nominee Tel No', 'tel')}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSelect('membershipStatus', 'Membership Status', [
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
        ])}
        {renderInput('statusDate', 'Status Date', 'date')}
      </div>

      {renderInput('proposers', 'Proposers')}

      <div>
        <label
          htmlFor="comments"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Comments:
        </label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleInputChange}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            fieldErrors['comments'] ? 'border-red-500' : 'border-gray-300'
          }`}
        ></textarea>
        {fieldErrors['comments'] && (
          <p className="text-red-500 text-xs mt-1">{fieldErrors['comments']}</p>
        )}
      </div>

      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="text-lg font-semibold text-gray-700 px-2">
          Payment Information
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput('receiptNo1', '1st Payment Receipt No')}
          {renderInput('amount1', '1st Payment Amount', 'number')}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {renderInput('receiptNo2', '2nd Payment Receipt No')}
          {renderInput('amount2', '2nd Payment Amount', 'number')}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {renderInput('receiptNo3', '3rd Payment Receipt No')}
          {renderInput('amount3', '3rd Payment Amount', 'number')}
        </div>
        <div className="mt-4">
          {renderInput('sharesPaid', 'Shares Paid', 'number')}
        </div>
        <div className="mt-4">
          {renderInput('balance', 'Balance', 'number')}
        </div>
      </fieldset>

      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="text-lg font-semibold text-gray-700 px-2">
          Entrance Fee
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderInput(
            'entranceMonthlyDeduction',
            'Monthly Deduction',
            'number'
          )}
          {renderInput('entranceAlreadyPaid', 'Already Paid', 'number')}
          {renderInput('entranceExpected', 'Expected', 'number')}
        </div>
      </fieldset>

      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="text-lg font-semibold text-gray-700 px-2">
          Monthly Contribution
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderInput('monthlyNormal', 'Normal', 'number')}
          {renderInput('monthlyOverride', 'Override', 'number')}
          {renderInput('monthlyOverrideBal', 'Override Balance', 'number')}
        </div>
      </fieldset>

      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="text-lg font-semibold text-gray-700 px-2">
          New Plant Shares
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderInput(
            'newPlantMonthlyDeduction',
            'Monthly Deduction',
            'number'
          )}
          {renderInput('newPlantAlreadyPaid', 'Already Paid', 'number')}
          {renderInput('newPlantExpected', 'Expected', 'number')}
        </div>
        <div className="mt-4">
          {renderInput('newPlantCertificateNo', 'Certificate No')}
        </div>
      </fieldset>

      {formState.message && (
        <div
          className={`text-sm mt-2 ${
            formState.errors ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {formState.message}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <SubmitButton />
        <button
          type="button"
          onClick={handleExit}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Exit
        </button>
      </div>
    </form>
  );
}
