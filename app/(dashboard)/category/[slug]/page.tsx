import TodoList from '@/components/TodosList';
import prisma from '@/libs/prismadb';

interface IParams {
  // categoryId: string;
  slug: string;
}
export default async function CategoryPage({ params }: { params: IParams }) {
  const todos = await prisma.todo.findMany({
    where: {
      status: false,
      category: {
        slug: params.slug,
      },
    },
    include: {
      category: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  return <TodoList todos={todos} />;
}
