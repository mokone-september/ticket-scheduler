import { create } from "zustand";

const useTicketStore = create((set) => ({
  tickets: [],
  addTicket: (task, date) =>
    set((state) => ({
      tickets: [...state.tickets, { id: Date.now(), task, date }],
    })),
  updateTicket: (id, updatedTask, updatedDate) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, task: updatedTask, date: updatedDate } : t
      ),
    })),
  deleteTicket: (id) =>
    set((state) => ({
      tickets: state.tickets.filter((t) => t.id !== id),
    })),
  clearTickets: () => set({ tickets: [] }),
}));

export default useTicketStore;
