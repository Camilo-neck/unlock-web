import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";

export class Fetch {
    private static instance: Fetch;
	private supabase: SupabaseClient;

    public constructor() {
        // Initialize the fetch instance here
		this.supabase = createClient();
    }

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
		const { data, error } = await this.supabase.auth.getSession();
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
