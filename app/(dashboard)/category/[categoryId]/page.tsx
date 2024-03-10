import TodoItem from '@/components/TodosList/TodoItem';
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
  });
  console.log(todos)
  if (!todos.length) return <div>No todos</div>;

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
