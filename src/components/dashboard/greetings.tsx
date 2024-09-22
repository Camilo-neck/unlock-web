'use client';

import useUser from "@/hooks/useUser";

const Greetings = () => {
    const { data: { user } } = useUser();
	return (
		<div className="flex items-center justify-between">
			<h1 className="text-black text-2xl font-bold">Hola {user?.app_metadata.full_name ?? 'Unnamed'} 👋,</h1>
		</div>
	);
};

export default Greetings;