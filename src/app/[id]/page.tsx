import ViewMemberForm from '@/components/ViewMember/ViewMember';

export default function ViewMemberPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Comprehensive Membership Form
        </h2>
        <ViewMemberForm />
      </div>
    </div>
  );
}
