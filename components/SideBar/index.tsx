import { FC } from 'react';
import prisma from '@/libs/prismadb';
import Link from 'next/link';
import ActionButtons from './ActionButtons';
import NavItem from './NavItem';

const SideBar: FC = async () => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          Todos: {
            where: {
              status: false,
            },
          },
        },
      },
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
  return (
    <aside className="w-[300px] border-r-2 border-slate-300/20">
      <ul>
        {categories.map((category) => {
          return <NavItem key={category.id} category={category} />;
        })}
      </ul>

      {/* <ActionButtons /> */}
    </aside>
  );
};

export default SideBar;
