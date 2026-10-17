// Sections below the fold are mounted lazily (see LazyMount). Before scrolling to
// one we ask every section to mount, so earlier sections have their real height
// and the smooth scroll lands on the right spot.
const MOUNT_EVENT = "portfolio:mount-all-sections";
let allMounted = false;

export function onMountAllSections(callback: () => void) {
  const handler = () => {
    allMounted = true;
    callback();
  };
  window.addEventListener(MOUNT_EVENT, handler);
  return () => window.removeEventListener(MOUNT_EVENT, handler);
}

export function scrollToSectionId(id: string, onStart?: () => void) {
  const go = () => {
    onStart?.();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  if (allMounted) {
    go();
    return;
  }
  window.dispatchEvent(new Event(MOUNT_EVENT));
  window.setTimeout(go, 400);
}
