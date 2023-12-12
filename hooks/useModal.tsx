import { create } from 'zustand';
import { type ModalType } from '@/types/modalTypes';

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
