import { FC } from 'react';
import prisma from '@/libs/prismadb';

const SideBar: FC = async () => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { Todos: true },
      },
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  return (
    <aside className="fixed left-0 top-0 z-30 h-full w-[200px] min-w-[200px] bg-zinc-100 px-2 py-3">
      SideBar
    </aside>
  );
};

export default SideBar;
