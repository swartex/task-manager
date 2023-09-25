import prisma from '@/libs/prismadb';
import Container from '@/components/Container';
import Input from '@/components/Input';

const Dashboard = async () => {
  const categories = await prisma.category.findMany();

  return (
    <Container>
      <Input />
      <button
        className="
          rounded-md
          bg-lime-700
          px-2
          py-1
          text-sm
          font-semibold
          text-white
          hover:bg-lime-600
        "
      >
        add
      </button>

      {categories.map((cat) => (
        <div key={cat.id}>
          <div>
            {cat.title} <br />
            <small>{cat.description}</small>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Dashboard;
