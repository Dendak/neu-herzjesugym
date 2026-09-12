import { useEffect, useState } from 'react';

export interface AsyncState<T> { data?: T; error?: Error; loading: boolean }

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ loading: true });
  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: undefined }));
    fn()
      .then((data) => { if (alive) setState({ data, loading: false }); })
      .catch((error: Error) => { if (alive) setState({ error, loading: false }); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}

const SUFFIX = ' · Privatgymnasium der Herz-Jesu-Missionare';
export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? title + SUFFIX : 'Privatgymnasium der Herz-Jesu-Missionare Salzburg';
  }, [title]);
}
