'use client';

import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';

const ToasterProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Toaster />
    </>
  );
};

export default ToasterProvider;
