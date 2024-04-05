import { create } from 'zustand';

const useTableStore = create((set) => ({
  open: null,
  setOpen: (open) => set({ open }),
}));
export default useTableStore;
