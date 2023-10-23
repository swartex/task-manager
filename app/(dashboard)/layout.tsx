import Container from '@/components/Container';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container className="pt-12">{children}</Container>;
};

export default DashboardLayout;
