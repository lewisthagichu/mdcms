'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TMember } from '@/lib/types';
import { useRouter } from 'next/navigation';

type HomeProps = {
  initialMembers: TMember[];
};

export default function Home({ initialMembers }: HomeProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [members, setMembers] = useState(initialMembers);

  useEffect(() => {}, [members]);

  const handleDelete = async (memberId: string | null) => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to delete this member?'
      );

      if (!confirmed) return;

      const response = await fetch(`/api/members/${memberId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMembers(members.filter((member) => member.id !== memberId));
        router.refresh();
      } else {
        console.error('Failed to delete member');
      }
    } catch (error) {
      console.log(error);
      alert('Failed to delete member');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Githunguri Dairy Farmers
      </h2>
      <div className="max-w-full max-h-[800px] overflow-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Member Number
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Member Name
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    National ID No.
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Center
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {members?.map((member) => (
                  <tr
                    onClick={() => setSelectedId(member?.id)}
                    key={member.id}
                    className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      selectedId === member.id && 'bg-gray-100 dark:bg-gray-900'
                    }`}
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {member.id}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                      {member.name}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {member.nationalIdNo}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {member.membershipStatus}
                    </td>

                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {member.collectionCentre}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-2 overflow-x-auto pb-4">
        <Link
          href={selectedId ? `/edit/${selectedId}` : '#'}
          className={`px-4 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            selectedId === null
              ? 'bg-blue-300 cursor-not-allowed pointer-events-none'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Amend
        </Link>
        <Link
          href="/add"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Insert
        </Link>
        <Link
          href={selectedId ? `/${selectedId}` : '#'}
          className={`px-4 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 ${
            selectedId === null
              ? 'bg-yellow-300 cursor-not-allowed pointer-events-none'
              : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          View
        </Link>
        <button
          onClick={() => handleDelete(selectedId)}
          disabled={selectedId === null}
          className={`px-4 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${
            selectedId === null
              ? 'bg-red-300 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
