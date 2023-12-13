'use client';

import { useState, useEffect } from 'react';
import CreateCategoryModal from '../Modals/CreateCategoryModal';
import CreateTodoModal from '../Modals/CreateTodoModal';
import UpdateCategoryModal from '../Modals/UpdateCategoryModal';

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
      <CreateCategoryModal />
      <CreateTodoModal />
      <UpdateCategoryModal />
    </>
  );
};

export default ModalProvider;
