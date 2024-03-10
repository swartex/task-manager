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
    <aside className="w-[300px] border-r-2 border-slate-300/20">
      <ul>
        {categories.map((category) => {
          return (
            <NavItem
              key={category.id}
              id={category.id}
              title={category.title}
              count={category._count.Todos}
              marker='work' // todo: need fix this
            />
          );
        })}
        <NavItem id="complited" marker='complited' title="Complited"/>
      </ul>

      {/* <ActionButtons /> */}
    </aside>
  );
};

export default SideBar;
