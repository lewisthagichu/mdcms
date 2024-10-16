import EditMemberForm from '@/components/EditMember/EditMemberForm';

export default function EditMemberPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Comprehensive Membership Form
        </h2>
        <EditMemberForm />
      </div>
    </div>
  );
}
