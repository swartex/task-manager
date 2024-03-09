import { FC, PropsWithChildren } from 'react';
import Container from '@/components/Container';
import SideBar from '@/components/SideBar';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full">
      <SideBar />
      <Container className="w-full px-5 pt-12">{children}</Container>
    </div>
  );
};

export default DashboardLayout;
