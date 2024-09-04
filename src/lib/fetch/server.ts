import { createClient } from "../supabase/server";

export class Fetch {
    private static instance: Fetch;

    public static getInstance(): Fetch {
        if (!Fetch.instance) {
            Fetch.instance = new Fetch();
        }
        return Fetch.instance;
    }

    public async fetch(
        input: RequestInfo | URL,
        init?: RequestInit
    ): Promise<Response> {
        const supabase = createClient();
		const { data, error } = await supabase.auth.getSession();
		if (error) {
			throw new Error('User not authenticated');
		}
        return await fetch(input, {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${data?.session?.access_token}`,
            },
        });
    }
}

export const fetchInstance = Fetch.getInstance();
