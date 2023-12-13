import TodoList from '@/components/TodosList';
import prisma from '@/libs/prismadb';

const TodosPage = async () => {
  const todos = await prisma.todo.findMany({
    include: {
      category: true,
    },
    orderBy: [
      {
        updatedAt: 'desc',
      },
    ],
  });

  return (
    <div>
      <ul>
        <TodoList todos={todos} />
      </ul>
    </div>
  );
};

export default TodosPage;
