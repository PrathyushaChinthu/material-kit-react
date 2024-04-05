import { create } from 'zustand';

const usePostStore = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  showFullData: false,
  setShowFullData: () => set((state) => ({ showFullData: !state.showFullData })),
}));

export default usePostStore;
