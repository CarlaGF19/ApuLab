import { create } from 'zustand';

interface PilotStore {
  isModalOpen: boolean;
  isToastVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  showToast: () => void;
  hideToast: () => void;
}

export const usePilotStore = create<PilotStore>((set) => ({
  isModalOpen: false,
  isToastVisible: false,
  openModal: () => {
    set({ isModalOpen: true });
    document.body.style.overflow = 'hidden';
  },
  closeModal: () => {
    set({ isModalOpen: false });
    document.body.style.overflow = 'auto';
  },
  showToast: () => set({ isToastVisible: true }),
  hideToast: () => set({ isToastVisible: false }),
}));
