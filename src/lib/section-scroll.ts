// Sections below the fold are mounted lazily (see LazyMount). Before scrolling to
// one we ask every section to mount and wait for their chunks, so earlier sections
// have their real height and the smooth scroll lands on the right spot.
const MOUNT_EVENT = "portfolio:mount-all-sections";
let allMounted = false;
let preloadSections: () => Promise<unknown> = () => Promise.resolve();

export function onMountAllSections(callback: () => void) {
  const handler = () => {
    allMounted = true;
    callback();
  };
  window.addEventListener(MOUNT_EVENT, handler);
  return () => window.removeEventListener(MOUNT_EVENT, handler);
}

/** Registers the loader that fetches every section chunk (set by TapContainer). */
export function registerSectionPreloader(load: () => Promise<unknown>) {
  preloadSections = load;
}

/** Resolves once the document height has stopped changing (or after maxMs). */
function waitForStableLayout(maxMs = 1500) {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    let lastHeight = document.documentElement.scrollHeight;
    let stableSince = start;
    const tick = (now: number) => {
      const height = document.documentElement.scrollHeight;
      if (height !== lastHeight) {
        lastHeight = height;
        stableSince = now;
      }
      if (now - stableSince > 200 || now - start > maxMs) resolve();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

const timeout = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

/**
 * Smooth-scrolls to a section. Calls onDone once the scroll has settled so callers
 * (the scroll-spy) know when to resume.
 */
export function scrollToSectionId(id: string, onDone?: () => void) {
  const go = () => {
    const el = document.getElementById(id);
    if (!el) {
      onDone?.();
      return;
    }
    el.scrollIntoView({ behavior: "smooth" });

    // Content above can still shift a little while we glide; re-aim once at the end.
    const settle = () => {
      const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      if (Math.abs(el.getBoundingClientRect().top - offset) > 4) el.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => onDone?.(), 400);
    };
    if ("onscrollend" in window) {
      let fired = false;
      const once = () => {
        if (fired) return;
        fired = true;
        settle();
      };
      window.addEventListener("scrollend", once, { once: true });
      // scrollend never fires when we're already at the target.
      window.setTimeout(once, 1600);
    } else {
      setTimeout(settle, 900);
    }
  };

  if (allMounted) {
    go();
    return;
  }
  window.dispatchEvent(new Event(MOUNT_EVENT));
  Promise.race([preloadSections(), timeout(2500)])
    .then(() => waitForStableLayout())
    .then(go, go);
}
