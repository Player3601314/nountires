import { create } from 'zustand';
import server from '../api/server';

export const countryDatas = create((set, get) => ({
  data: [],
  originalData: [],
  page: 1,
  getData: async () => {
    const currentPage = get().page;
    try {
      const response = await server.get(`/countries?_page=${currentPage}&_per_page=16`);

      set((state) => ({
        data: [...state.data, ...response.data.data],
        originalData: state.originalData.length === 0 ? response.data.data : state.originalData,
      }));
    } catch (error) {
      console.error("Ma'lumot olishda xatolik:", error);
    }
  },
  getAllData: async () => {
    try {
      const response = await server.get("/countries");
      set({ originalData: response.data });
    } catch (error) {
      console.error("Barcha ma'lumotlarni olishda xatolik:", error);
    }
  },
  setData: (countryData) => {
    set({ data: countryData });
  },
  setPage: (num) => {
    set({ page: num });
  },
  resetData: () => {
    set((state) => ({ data: state.originalData }));
  },
}));