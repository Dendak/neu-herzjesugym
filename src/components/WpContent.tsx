import { useMemo, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { prepareHtml } from '@/lib/html';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Zeigt von WordPress gerendertes HTML an; interne Links werden clientseitig geroutet. */
export default function WpContent({ html, className }: { html: string; className?: string }) {
  const navigate = useNavigate();
  const prepared = useMemo(() => prepareHtml(html, BASE), [html]);

  function onClick(e: MouseEvent<HTMLDivElement>) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const a = (e.target as HTMLElement).closest('a[data-route]');
    if (!a) return;
    e.preventDefault();
    navigate(a.getAttribute('data-route')!);
  }

  return <div className={clsx('wp-content', className)} onClick={onClick} dangerouslySetInnerHTML={{ __html: prepared }} />;
}
