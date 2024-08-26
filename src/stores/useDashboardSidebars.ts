import { create } from 'zustand';

type DashboardSidebars = {
	open: 'left' | 'right';
	setOpen: (open: 'left' | 'right') => void;
	toggleOpen: () => void;
};

const useDashboardSidebars = create<DashboardSidebars>((set) => ({
	open: 'left',
	setOpen: (open) => set({ open }),
	toggleOpen: () => set((state) => ({ open: state.open === 'left' ? 'right' : 'left' })),
}));

export default useDashboardSidebars;