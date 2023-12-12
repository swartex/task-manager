import prisma from '@/libs/prismadb';

const TodosPage = async () => {
  const todos = await prisma.todo.findMany({
    include: {
      category: true,
    },
  });

  return (
    <div>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default TodosPage;
