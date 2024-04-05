import { create } from 'zustand';

const usePhotosStore = create((set) => ({
  openFilter: false,
  setOpenFilter: (openFilter) => set({ openFilter }),
  photos: [],
  setPhotos: (newPhotos) => set({ photos: newPhotos }),
  page: 1,
  setPage: (page) => set({ page }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  fetchingMore: false,
  setFetchingMore: (fetchingMore) => set({ fetchingMore }),
  open: null,
  setOpen: (open) => set({ open }),
}));

export default usePhotosStore;
