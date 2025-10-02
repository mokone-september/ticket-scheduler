import { create } from 'zustand';

const useTicketStore = create((set) => ({
  tickets: [],
  addTicket: (task, date) =>
    set((state) => ({
      tickets: [...state.tickets, { task, date }],
    })),
  clearTickets: () => set({ tickets: [] }),
}));

export default useTicketStore;
