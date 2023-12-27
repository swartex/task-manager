import Container from '@/components/Container';
import SideBar from '@/components/SideBar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideBar />
      <Container className="pl-[200px] pt-12">{children}</Container>
    </>
  );
};

export default DashboardLayout;
