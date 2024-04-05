import { create } from 'zustand';

const useStore = create((set) => ({
  loading: true,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
  users: [],
  setUsers: (users) => set({ users }),
  totalUsers: 0,
  setTotalUsers: (totalUsers) => set({ totalUsers }),
  page: 0,
  setPage: (page) => set({ page }),
  order: 'asc',
  setOrder: (order) => set({ order }),
  selected: [],
  setSelected: (selected) => set({ selected }),
  orderBy: 'name',
  setOrderBy: (orderBy) => set({ orderBy }),
  filterName: '',
  setFilterName: (filterName) => set({ filterName }),
  rowsPerPage: 5,
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),
}));

export default useStore;
