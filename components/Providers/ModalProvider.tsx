'use client';

import { useState, useEffect } from 'react';
import CreateModal from '../Modals/CreateModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateModal />
    </>
  );
};

export default ModalProvider;
