export const setupInfiniteScroll = (
  element: HTMLElement | null,
  onIntersect: () => void,
  isInitLoad: () => boolean
): (() => void) => {
  if (!element) return () => {};
  const obs = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting && !isInitLoad()) {
      onIntersect();
    }
  });
  obs.observe(element);

  return () => obs.disconnect();
};
