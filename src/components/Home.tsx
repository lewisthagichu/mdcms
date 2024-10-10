'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const members = [
  {
    number: '1',
    name: 'JAMES WAIRIA KAMAU',
    nationalId: '',
    route: '',
    center: '1A',
  },
  {
    number: '2',
    name: 'WILLIE GATOTO',
    nationalId: '000',
    route: '1A',
    center: '1A',
  },
  {
    number: '3',
    name: 'STEPHEN KAMAU NJOKA',
    nationalId: '484874',
    route: '10',
    center: '61',
  },
  {
    number: '4',
    name: 'CYRUS KARANJA KINYUA',
    nationalId: '0',
    route: '1',
    center: '1A',
  },
  {
    number: '5',
    name: 'JACKSON KAMAU',
    nationalId: '0',
    route: '1',
    center: '1A',
  },
  {
    number: '6',
    name: 'BECKY NGENDO KARANJA',
    nationalId: '0',
    route: '2',
    center: '2A',
  },
  {
    number: '7',
    name: 'MBIRA KIMANI',
    nationalId: '4882008',
    route: '10',
    center: '10',
  },
  {
    number: '8',
    name: 'MARY NJERI ELIJAH',
    nationalId: '',
    route: '10',
    center: '10',
  },
  {
    number: '9',
    name: 'JOSEPH KAMAU MOKO',
    nationalId: '4928077',
    route: '2',
    center: '2D',
  },
  {
    number: '10',
    name: 'KIRIKA MUNENGE',
    nationalId: '9199256',
    route: '1',
    center: '1C',
  },
  {
    number: '11',
    name: 'PAUL NDUNGU KAMERE',
    nationalId: '',
    route: '10',
    center: '10',
  },
  {
    number: '12',
    name: 'GEORGE BAIYA WAITHIRU',
    nationalId: '3076369',
    route: '1',
    center: '1A',
  },
  {
    number: '13',
    name: 'PERIS NDUTA BAIYA',
    nationalId: '',
    route: '3',
    center: '3A',
  },
  {
    number: '14',
    name: 'KIHARA GACHAU',
    nationalId: '4311131',
    route: '3',
    center: '3A',
  },
  {
    number: '15',
    name: 'RUTH GIKUI GITAU',
    nationalId: '',
    route: '3',
    center: '3A',
  },
  {
    number: '16',
    name: 'KIMANI KARANJA',
    nationalId: '5712579',
    route: '5',
    center: '5D',
  },
  {
    number: '17',
    name: 'NJUGUNA MWATHI',
    nationalId: '',
    route: '10',
    center: '10',
  },
  {
    number: '18',
    name: 'JOHN KABERERE KAHUHU',
    nationalId: '',
    route: '2',
    center: '2A',
  },
  {
    number: '19',
    name: 'WALLECE MBUGUA',
    nationalId: '',
    route: '3',
    center: '3A',
  },
  {
    number: '20',
    name: 'NGUGI NGANGA',
    nationalId: '3099425',
    route: '2',
    center: '2A',
  },
  {
    number: '21',
    name: 'SAMUEL GATHEIYA',
    nationalId: '',
    route: '5',
    center: '5D',
  },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const handleClick = (memberId: string) => {
    setSelectedId(memberId);
    return;
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
                    Route
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
                {members.map((member) => (
                  <tr
                    onClick={() => handleClick(member.number)}
                    key={member.number}
                    className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      selectedId === member.number &&
                      'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {member.number}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                      {member.name}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {member.nationalId}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {member.route}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {member.center}
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
          href={`/edit/${selectedId}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Amend
        </Link>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          Insert
        </button>
        <Link
          href={`/${selectedId}`}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
        >
          View
        </Link>
        <button
          disabled={selectedId === null}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
