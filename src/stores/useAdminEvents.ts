import { Event } from "@/schemas/event.schema";
import { create } from "zustand";

export type AdminEvents = {
	events: Event[];
	setEvents: (events: Event[]) => void;
	appendEvents: (newEvents: Event[]) => void;
	appendEvent: (newEvent: Event) => void;
};

const useAdminEvents = create<AdminEvents>((set) => ({
	events: [],
	setEvents: (events) => set({ events: events }),
	appendEvents: (newEvents) => set((state) => ({ events: [...state.events, ...newEvents] })),
	appendEvent: (newEvent) => set((state) => ({ events: [...state.events, newEvent] })),
}));

export default useAdminEvents;