import axios from 'axios';
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
import { useEffect, useState } from 'react';
export function useGet(url, params) {
  const [s, set] = useState({ data: null, loading: true, error: null });
  const key = url + JSON.stringify(params || {});
  useEffect(() => { let on = true; set(x => ({ ...x, loading: true, error: null }));
    api.get(url, { params }).then(r => on && set({ data: r.data, loading: false, error: null }))
      .catch(e => on && set({ data: null, loading: false, error: e.response?.data?.error || 'Could not reach the server. Is the API running?' }));
    return () => { on = false; }; }, [key]);
  return s;
}
