import { create } from 'zustand';
import { type ModalType } from '@/types/modalTypes';
import { Category, Todo } from '@prisma/client';

interface ModalData {
  category?: Category;
  todo?: Todo;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: any) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
