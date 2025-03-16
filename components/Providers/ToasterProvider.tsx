'use client';

import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';

const ToasterProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <Toaster closeButton richColors position="bottom-right" />;
};

export default ToasterProvider;
