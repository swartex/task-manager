import { FC, PropsWithChildren } from 'react';
import Container from '@/components/Container';
import SideBar from '@/components/SideBar';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SideBar />
      <Container className="w-full pl-[220px] pt-12">{children}</Container>
    </>
  );
};

export default DashboardLayout;
