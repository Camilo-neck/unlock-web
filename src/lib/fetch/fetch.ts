import { Fetch as ClientFetch } from "./client";
import { Fetch as ServerFetch } from "./server";

export default class FetchFactory {
    public static getFetchAdapter(mode: 'server' | 'client' = 'client'): typeof ClientFetch | typeof ServerFetch {
        return mode === 'server' ? ServerFetch : ClientFetch;
    }
}
