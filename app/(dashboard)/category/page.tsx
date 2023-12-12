import prisma from '@/libs/prismadb';
import CategoryTable from './_components/CategoryTable';


const Dashboard = async () => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { Todos: true },
      },
    },
  });

  return (
    <CategoryTable categories={categories} />
  );
};

export default Dashboard;
