'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createMember } from '@/actions/actions';
import SubmitButton from '../common/SubmitButton';

const initialFormData = {
  membershipNo: 'M001',
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
  sharesPaid: 4500,
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

  useEffect(() => {
    if (formState.message === 'success') {
      router.push('/');
    } else {
      console.log(formState.errors);
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="membershipNo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Membership No:
          </label>
          <input
            type="text"
            id="membershipNo"
            name="membershipNo"
            value={formData.membershipNo}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of birth:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="salutation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Salutation:
          </label>
          <select
            id="salutation"
            name="salutation"
            value={formData.salutation}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="sex"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sex:
          </label>
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="dateJoined"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date Joined:
          </label>
          <input
            type="date"
            id="dateJoined"
            name="dateJoined"
            value={formData.dateJoined}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="collectionCentre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Collection Centre:
          </label>
          <select
            id="collectionCentre"
            name="collectionCentre"
            value={formData.collectionCentre}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="1A">1A</option>
            <option value="2A">2A</option>
            <option value="3A">3A</option>
            <option value="4A">4A</option>
            <option value="5A">5A</option>
            <option value="6A">6A</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="kraPin"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            KRA PIN:
          </label>
          <input
            type="text"
            id="kraPin"
            name="kraPin"
            value={formData.kraPin}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="telephone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Telephone:
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="bank"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bank:
          </label>
          <select
            id="bank"
            name="bank"
            value={formData.bank}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="equity">Equity</option>
            <option value="family">Family Bank</option>
            <option value="cooperative">Cooperative</option>
            <option value="ncba">NCBA</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="bankAc"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bank A/c:
          </label>
          <input
            type="text"
            id="bankAc"
            name="bankAc"
            value={formData.bankAc}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="division"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Division:
          </label>
          <input
            type="text"
            id="division"
            name="division"
            value={formData.division}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="noOfCows"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            No of Cows:
          </label>
          <input
            type="number"
            id="noOfCows"
            name="noOfCows"
            value={formData.noOfCows}
            onChange={handleInputChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="cowsInMilk"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cows in Milk:
          </label>
          <input
            type="number"
            id="cowsInMilk"
            name="cowsInMilk"
            value={formData.cowsInMilk}
            onChange={handleInputChange}
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="nationalIdNo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            National ID No:
          </label>
          <input
            type="text"
            id="nationalIdNo"
            name="nationalIdNo"
            value={formData.nationalIdNo}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="nhifNo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            NHIF No:
          </label>
          <input
            type="text"
            id="nhifNo"
            name="nhifNo"
            value={formData.nhifNo}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="nhifAmt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            NHIF Amount:
          </label>
          <input
            type="number"
            id="nhifAmt"
            name="nhifAmt"
            value={formData.nhifAmt}
            onChange={handleInputChange}
            step="1"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="village"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Village:
          </label>
          <input
            type="text"
            id="village"
            name="village"
            value={formData.village}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="subLocation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sub-location:
          </label>
          <input
            type="text"
            id="subLocation"
            name="subLocation"
            value={formData.subLocation}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="dateOfLeaving"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Leaving:
          </label>
          <input
            type="date"
            id="dateOfLeaving"
            name="dateOfLeaving"
            value={formData.dateOfLeaving}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="creditLimit"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Credit Limit:
          </label>
          <input
            type="number"
            id="creditLimit"
            name="creditLimit"
            value={formData.creditLimit}
            onChange={handleInputChange}
            step="1"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="currentCreditUsed"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Credit Used:
          </label>
          <input
            type="number"
            id="currentCreditUsed"
            name="currentCreditUsed"
            value={formData.currentCreditUsed}
            onChange={handleInputChange}
            step="1"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="text-lg font-semibold text-gray-700 px-2">
          Nominee Information
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="nomineeName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nominee Name:
            </label>
            <input
              type="text"
              id="nomineeName"
              name="nomineeName"
              value={formData.nomineeName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="nomineeIdNo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nominee ID No:
            </label>
            <input
              type="text"
              id="nomineeIdNo"
              name="nomineeIdNo"
              value={formData.nomineeIdNo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label
              htmlFor="nomineeRelationship"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Relationship:
            </label>
            <input
              type="text"
              id="nomineeRelationship"
              name="nomineeRelationship"
              value={formData.nomineeRelationship}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="nomineeAddress"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nominee Address:
            </label>
            <input
              type="text"
              id="nomineeAddress"
              name="nomineeAddress"
              value={formData.nomineeAddress}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="nomineeTelNo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nominee Tel No:
            </label>
            <input
              type="tel"
              id="nomineeTelNo"
              name="nomineeTelNo"
              value={formData.nomineeTelNo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="membershipStatus"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Membership Status:
          </label>
          <select
            id="membershipStatus"
            name="membershipStatus"
            value={formData.membershipStatus}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="statusDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status Date:
          </label>
          <input
            type="date"
            id="statusDate"
            name="statusDate"
            value={formData.statusDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="proposers"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Proposers:
        </label>
        <input
          type="text"
          id="proposers"
          name="proposers"
          value={formData.proposers}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        ></textarea>
      </div>

      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="text-lg font-semibold text-gray-700 px-2">
          Payment Information
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="receiptNo1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              1st Payment Receipt No:
            </label>
            <input
              type="text"
              id="receiptNo1"
              name="receiptNo1"
              value={formData.receiptNo1}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="amount1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              1st Payment Amount:
            </label>
            <input
              type="number"
              id="amount1"
              name="amount1"
              value={formData.amount1}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label
              htmlFor="receiptNo2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              2nd Payment Receipt No:
            </label>
            <input
              type="text"
              id="receiptNo2"
              name="receiptNo2"
              value={formData.receiptNo2}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="amount2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              2nd Payment Amount:
            </label>
            <input
              type="number"
              id="amount2"
              name="amount2"
              value={formData.amount2}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label
              htmlFor="receiptNo3"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              3rd Payment Receipt No:
            </label>
            <input
              type="text"
              id="receiptNo3"
              name="receiptNo3"
              value={formData.receiptNo3}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="amount3"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              3rd Payment Amount:
            </label>
            <input
              type="number"
              id="amount3"
              name="amount3"
              value={formData.amount3}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="sharesPaid"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Shares Paid:
          </label>
          <input
            type="number"
            id="sharesPaid"
            name="sharesPaid"
            value={formData.sharesPaid}
            onChange={handleInputChange}
            step="1"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="balance"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Balance:
          </label>
          <input
            type="number"
            id="balance"
            name="balance"
            value={formData.balance}
            onChange={handleInputChange}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
      </fieldset>

      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="text-lg font-semibold text-gray-700 px-2">
          Entrance Fee
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="entranceMonthlyDeduction"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Monthly Deduction:
            </label>
            <input
              type="number"
              id="entranceMonthly Deduction"
              name="entranceMonthlyDeduction"
              value={formData.entranceMonthlyDeduction}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="entranceAlreadyPaid"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Already Paid:
            </label>
            <input
              type="number"
              id="entranceAlreadyPaid"
              name="entranceAlreadyPaid"
              value={formData.entranceAlreadyPaid}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="entranceExpected"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expected:
            </label>
            <input
              type="number"
              id="entranceExpected"
              name="entranceExpected"
              value={formData.entranceExpected}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="text-lg font-semibold text-gray-700 px-2">
          Monthly Contribution
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="monthlyNormal"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Normal:
            </label>
            <input
              type="number"
              id="monthlyNormal"
              name="monthlyNormal"
              value={formData.monthlyNormal}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="monthlyOverride"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Override:
            </label>
            <input
              type="number"
              id="monthlyOverride"
              name="monthlyOverride"
              value={formData.monthlyOverride}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="monthlyOverrideBal"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Override Balance:
            </label>
            <input
              type="number"
              id="monthlyOverrideBal"
              name="monthlyOverrideBal"
              value={formData.monthlyOverrideBal}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="text-lg font-semibold text-gray-700 px-2">
          New Plant Shares
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="newPlantMonthlyDeduction"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Monthly Deduction:
            </label>
            <input
              type="number"
              id="newPlantMonthlyDeduction"
              name="newPlantMonthlyDeduction"
              value={formData.newPlantMonthlyDeduction}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="newPlantAlreadyPaid"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Already Paid:
            </label>
            <input
              type="number"
              id="newPlantAlreadyPaid"
              name="newPlantAlreadyPaid"
              value={formData.newPlantAlreadyPaid}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="newPlantExpected"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expected:
            </label>
            <input
              type="number"
              id="newPlantExpected"
              name="newPlantExpected"
              value={formData.newPlantExpected}
              onChange={handleInputChange}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="newPlantCertificateNo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Certificate No:
          </label>
          <input
            type="text"
            id="newPlantCertificateNo"
            name="newPlantCertificateNo"
            value={formData.newPlantCertificateNo}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
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
