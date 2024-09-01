import { createClient } from "@/lib/supabase/client";
import { AuthError, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useSession() {
	const supabase = createClient();
	const [ session, setSession ] = useState<{
		data: {
			session: Session;
		};
		error: null;
	} | {
		data: {
			session: null;
		};
		error: AuthError;
	} | {
		data: {
			session: null;
		};
		error: null;
	}>({
		data: {
			session: null
		},
		error: null
	});

	useEffect(()=>{
		async function f() {
			const currSession = await supabase.auth.getSession()
			setSession(currSession)
		} 
		f();
	}, [supabase])

	return session
} 