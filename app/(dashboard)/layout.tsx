import { FC, PropsWithChildren } from 'react';
import Container from '@/components/Container';
import SideBar from '@/components/SideBar';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SideBar />
      <Container className="w-full px-5 pl-[220px] pt-12">{children}</Container>
    </>
  );
};

export default DashboardLayout;
