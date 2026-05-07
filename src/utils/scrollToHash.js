/**
 * Reliably scroll the window to the section identified by `hash`.
 *
 * Two failure modes this routine works around:
 *
 *   1. Hydration / route-mount timing. After cross-page navigation
 *      (e.g. /he/page/privacy → /he#contact) the target may not yet
 *      be in the DOM when the effect that called us runs. We poll
 *      with requestAnimationFrame for up to ~30 frames before giving
 *      up — no setTimeout backoff.
 *
 *   2. content-visibility: auto. Sections marked with
 *      `content-visibility: auto` keep a placeholder intrinsic-size
 *      until they become viewport-relevant. The browser then
 *      computes scrollIntoView's target Y from the placeholder
 *      sizes of every skipped ancestor section, which lands the
 *      smooth scroll in the wrong place. We temporarily promote
 *      every `section[id]` to `content-visibility: visible` so the
 *      real layout converges before the scroll, then restore the
 *      original inline value once the scroll lands. We use the
 *      `scrollend` event when available, with a duration-based
 *      fallback for browsers that don't support it.
 *
 * Returns a cancellation function that aborts any pending rAF /
 * pending restore handler — useful when a new navigation arrives
 * before the previous scroll has finished.
 */
const SMOOTH_SCROLL_FALLBACK_MS = 900;

export function scrollToHash(hash, { smooth = true, maxAttempts = 30 } = {}) {
  if (typeof window === 'undefined') return () => {};

  const id = decodeURIComponent(String(hash || '').replace(/^#/, ''));
  if (!id) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return () => {};
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const useSmooth = smooth && !reduced;

  let cancelled = false;
  let rafId = 0;
  let endHandler = null;
  let endTimer = 0;

  const cleanup = () => {
    cancelled = true;
    if (rafId) cancelAnimationFrame(rafId);
    if (endHandler) {
      window.removeEventListener('scrollend', endHandler);
      endHandler = null;
    }
    if (endTimer) {
      clearTimeout(endTimer);
      endTimer = 0;
    }
  };

  let attempts = 0;
  const tryScroll = () => {
    if (cancelled) return;
    rafId = 0;
    const el = document.getElementById(id);
    if (!el) {
      if (++attempts < maxAttempts) {
        rafId = requestAnimationFrame(tryScroll);
      }
      return;
    }

    /* Promote every flagged section so the browser computes real
       offsetTop values for the smooth scroll. We snapshot the inline
       contentVisibility so the restore step doesn't clobber a per-
       element override. */
    const deferred = Array.from(document.querySelectorAll('section[id]'));
    const inlineSaves = deferred.map(node => node.style.contentVisibility);
    deferred.forEach(node => { node.style.contentVisibility = 'visible'; });

    /* Force a synchronous layout pass so the style change above is
       reflected in element box positions before scrollIntoView reads
       them. */
    void el.getBoundingClientRect();

    el.scrollIntoView({
      behavior: useSmooth ? 'smooth' : 'auto',
      block: 'start',
    });

    /* Preserve native anchor accessibility: if the target is focusable
       (skip link → <main tabIndex={-1}>, etc.), move focus there so
       keyboard / screen-reader users land in the right place. Native
       <a href="#x"> does this for free; once we've called preventDefault
       on the click we have to do it ourselves. preventScroll keeps the
       smooth scroll above from being clobbered by a focus-jump. */
    const naturallyFocusable = /^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName);
    if (el.hasAttribute('tabindex') || naturallyFocusable) {
      try { el.focus({ preventScroll: true }); } catch { /* ignore */ }
    }

    const restore = () => {
      deferred.forEach((node, i) => {
        node.style.contentVisibility = inlineSaves[i] || '';
      });
    };

    if (!useSmooth) {
      restore();
      return;
    }

    if ('onscrollend' in window) {
      endHandler = () => {
        endHandler = null;
        restore();
      };
      window.addEventListener('scrollend', endHandler, { once: true });
      /* Safety net: if scrollend never fires (target already in view,
         tab backgrounded, etc.) we still restore eventually. */
      endTimer = window.setTimeout(() => {
        if (endHandler) {
          window.removeEventListener('scrollend', endHandler);
          endHandler = null;
        }
        restore();
      }, SMOOTH_SCROLL_FALLBACK_MS);
    } else {
      endTimer = window.setTimeout(restore, SMOOTH_SCROLL_FALLBACK_MS);
    }
  };

  rafId = requestAnimationFrame(tryScroll);
  return cleanup;
}
