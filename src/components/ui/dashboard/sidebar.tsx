import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Lock } from 'lucide-react';
import React from 'react';
import Collapsible from './sidebar/collapsible';
import Options from './sidebar/options';

const sidebarVariants = cva(
	'bg-white border h-screen top-0 left-0 z-50 flex flex-col gap-10 p-8',
	{
    variants: {
      variant: {
		default: '',
	  },
	  size: {
		default: 'w-72',
		sm: 'w-16',
	  }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {
	asChild?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
	({className, variant, size, asChild = false, ...props}, ref) => {
	return (
		<div 
			className={cn(sidebarVariants({variant, size, className}))}
			ref={ref}
			{...props}	
		>
			<div className={cn('flex gap-2 items-center', size === 'sm' && 'hidden')}>
				<Lock size={36} className='text-primary border-primary' />
				{!asChild && (
					<div className='flex gap-1 flex-1 items-end'>
						<p className='text-lg font-bold'>Unlock</p>
						<p className='text-xs text-neutral-500'>v0.1</p>
					</div>
				)}
			</div>
			<div className='mt-5'>
				{
					size === 'sm' && (
						<Options />
					)
				}
				{
					size === 'default' && (
						<Collapsible />
					)
				}
			</div>
		</div>
	);
}
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;