import TodoList from '@/components/TodosList';
import prisma from '@/libs/prismadb';

export default async function ComplitedPage() {
  const complitedTodos = await prisma.todo.findMany({
    where: {
      status: true,
    },
    include: {
      category: true,
    },
  });

  return (
    <div>
      <TodoList todos={complitedTodos} />
    </div>
  );
}
