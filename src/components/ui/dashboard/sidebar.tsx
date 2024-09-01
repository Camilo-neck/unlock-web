import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Lock, LogOut } from 'lucide-react';
import React, { useEffect } from 'react';
import Collapsible from './sidebar/collapsible';
import Options from './sidebar/options';
import { createClient } from '@/lib/supabase/client';
import useUser from '@/hooks/useUser';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu';
import { Button } from '../button';
import { useRouter } from 'next/navigation';
import  { useQuery } from 'react-query';
import useSession from '@/hooks/useSession';
import getAdminEvents from '@/services/getAdminEvents';

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
	const supabase = createClient();
	const router = useRouter();
	const { data: userData } = useUser();
	const { data: sessionData } = useSession();

	const { data: userEvents } = useQuery({
		queryKey: 'userEvents',
		queryFn: () => getAdminEvents(sessionData.session?.access_token ?? ''),
		enabled: !!sessionData.session?.access_token
	});

	useEffect(() => {
		console.log(userEvents);
	}, [userEvents]);
	
	const signOut = async () => {
		await supabase.auth.signOut();
		router.push('/');
	}
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
			<div className='mt-5 flex-1'>
				{
					size === 'sm' && (
						<Options events={userEvents} />
					)
				}
				{
					size === 'default' && (
						<Collapsible events={userEvents} />
					)
				}
			</div>
			{
				size === 'default' && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className='flex flex-col gap-1 text-wrap break-all'>
								<p className='text-sm font-semibold'>{userData?.user?.user_metadata.full_name ?? 'Unnamed'}</p>
								<p className='text-xs'>{userData?.user?.email}</p>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Button onClick={signOut} variant='ghost'>
									<LogOut className='mr-1' size={16} />
									Log Out
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			}
		</div>
	);
}
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;