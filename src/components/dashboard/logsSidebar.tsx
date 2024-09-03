'use client';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import Logs from './logsSidebar/logs';
import useDashboardSidebars from '@/stores/useDashboardSidebars';

const logsSidebarVariants = cva(
	'bg-white border h-screen top-0 right-0 z-50 flex flex-col gap-2 p-8',
	{
    variants: {
      variant: {
		default: '',
	  },
	  size: {
		default: 'w-96',
		sm: 'w-0 hidden',
	  }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof logsSidebarVariants> {
	asChild?: boolean;
}

const LogsSidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
	({className, variant, size, asChild = false, ...props}, ref) => {
	const { setOpen } = useDashboardSidebars();
	return (
		<div 
			className={cn(logsSidebarVariants({variant, size, className}))}
			ref={ref}
			{...props}	
		>
			<div className='flex justify-between gap-2 items-center'>
				<p className='font-semibold text-lg'>Logs</p>
				<Button onClick={() => setOpen('left')} className='rounded-full' variant='ghost'>
					<X size={16} />
				</Button>
			</div>
			<hr />
			<div className='mt-5'>
				<Logs />
			</div>
		</div>
	);
}
);

LogsSidebar.displayName = 'LogsSidebar';

export default LogsSidebar;