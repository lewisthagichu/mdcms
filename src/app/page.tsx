import Home from '@/components/Home/Home';
import prisma from '@/lib/db';

export default async function HomePage() {
  const members = await prisma.member.findMany();
  return (
    <main className=" font-[family-name:var(--font-geist-sans)]">
      <Home initialMembers={members} />
    </main>
  );
}
