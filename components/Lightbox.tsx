'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from './icons';

type Capture = { src: string; alt: string; caption: string };

export default function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const links = useRef<HTMLAnchorElement[]>([]);
  const index = useRef(0);
  const [capture, setCapture] = useState<Capture | null>(null);
  const pathname = usePathname();

  function show(position: number) {
    index.current = (position + links.current.length) % links.current.length;
    const link = links.current[index.current];
    setCapture({
      src: link.href,
      alt: link.querySelector('img')?.alt ?? '',
      caption: link.closest('figure')?.querySelector('figcaption')?.textContent ?? '',
    });
  }

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    let previousOverflow: string | undefined;
    function restore() {
      if (previousOverflow !== undefined) {
        document.body.style.overflow = previousOverflow;
        previousOverflow = undefined;
      }
      setCapture(null);
      if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
      opener.current = null;
    }
    function click(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[data-lightbox]') : null;
      if (!link || !modal || typeof modal.showModal !== 'function') return;
      event.preventDefault();
      links.current = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]'));
      opener.current = link;
      show(links.current.indexOf(link));
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      modal.showModal();
    }
    function keydown(event: KeyboardEvent) {
      if (!modal?.open || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      event.preventDefault();
      show(index.current + (event.key === 'ArrowRight' ? 1 : -1));
    }
    document.addEventListener('click', click);
    document.addEventListener('keydown', keydown);
    modal.addEventListener('close', restore);
    return () => {
      document.removeEventListener('click', click);
      document.removeEventListener('keydown', keydown);
      modal.removeEventListener('close', restore);
      if (modal.open) modal.close();
      restore();
    };
  }, [pathname]);

  return (
    <dialog ref={dialog} className="capture-lightbox" aria-label="Capture en jeu agrandie" aria-describedby={capture ? 'capture-lightbox-caption' : undefined}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="capture-lightbox-toolbar">
        <button type="button" aria-label="Fermer la capture" autoFocus onClick={() => dialog.current?.close()}><Icon name="close" size={20} /> Fermer</button>
      </div>
      {capture ? <>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={capture.src} alt={capture.alt} decoding="async" />
          <figcaption id="capture-lightbox-caption" aria-live="polite">{capture.caption}</figcaption>
        </figure>
        {links.current.length > 1 ? <div className="capture-lightbox-navigation">
          <button type="button" aria-label="Capture précédente" onClick={() => show(index.current - 1)}><Icon name="arrowLeft" /> Précédente</button>
          <span aria-live="polite">{index.current + 1} / {links.current.length}</span>
          <button type="button" aria-label="Capture suivante" onClick={() => show(index.current + 1)}>Suivante <Icon name="arrowRight" /></button>
        </div> : null}
      </> : null}
    </dialog>
  );
}
