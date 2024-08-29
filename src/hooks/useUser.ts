import { createClient } from "@/lib/supabase/client";
import { UserResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useUser() {
	const [ user, setUser ] = useState<UserResponse>(
		{
			data: {
				user: { id: '', aud: '', email: '', role: '', confirmed_at: '', app_metadata: { provider: '' }, user_metadata: { full_name: '', avatar : '' }, created_at: '', updated_at: '' }
			},
			error: null,
		}
	);

	useEffect(()=>{
		async function f() {
			const supabase = createClient();
			const currUser = await supabase.auth.getUser()
			setUser(currUser)
		} 
		f();
	}, [])

	return user 
} 