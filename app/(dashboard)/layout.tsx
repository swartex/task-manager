import { FC, PropsWithChildren } from 'react';
import Container from '@/components/ui/Container';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex h-full">
        <SideBar />
        <Container className="w-full px-5 pt-5">{children}</Container>
      </div>
    </>
  );
};

export default DashboardLayout;
