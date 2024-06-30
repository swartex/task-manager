import { type FC, type PropsWithChildren } from 'react';

import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import Container from '@/components/ui/Container';

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
