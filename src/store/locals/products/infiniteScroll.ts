export const setupInfiniteScroll = (
  element: HTMLElement | null,
  onIntersect: () => void
): (() => void) => {
  if (!element) return () => {};
  const obs = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      onIntersect();
    }
  });
  obs.observe(element);

  return () => obs.disconnect();
};
