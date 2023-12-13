import CategoryList from '@/components/CategoryList';
import prisma from '@/libs/prismadb';

const Dashboard = async () => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { Todos: true },
      },
    },
    orderBy: [
      {
        createdAt: 'asc',
      },
    ],
  });

  return <CategoryList categories={categories} />;
};

export default Dashboard;
