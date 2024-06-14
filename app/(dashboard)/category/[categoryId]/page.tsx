import TodoList from '@/components/TodosList';
import prisma from '@/libs/prismadb';

interface IParams {
  categoryId: string;
}
export default async function SingleCategoryPage({ params }: { params: IParams }) {
  const todos = await prisma.todo.findMany({
    where: {
      category_id: params.categoryId,
      status: false,
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
