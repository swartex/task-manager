import { FC } from 'react';
import prisma from '@/libs/prismadb';
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
    <aside className="hidden w-[230px] min-w-[230px] border-r-2 border-slate-300/20 bg-white sm:block">
      <ul>
        {categories.map((category) => {
          return (
            <NavItem
              key={category.id}
              slug={category.slug as string}
              title={category.title}
              count={category._count.Todos}
              // marker='work' // TODO: need fix this
            />
          );
        })}
        <NavItem slug="complited" marker="complited" title="Complited" />
      </ul>

      {/* <ActionButtons /> */}
    </aside>
  );
};

export default SideBar;
