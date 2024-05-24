import TodoList from '@/components/TodosList';
import prisma from '@/libs/prismadb';

const TodosPage = async () => {
  const todos = await prisma.todo.findMany({
    where: {
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

  return (
    <TodoList todos={todos} />
  );
};

export default TodosPage;
