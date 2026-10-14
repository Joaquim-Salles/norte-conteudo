const clamp01 = (value) => Math.max(0, Math.min(1, value));

export const screenProgress = (frame, start, end) =>
  clamp01((frame - start) / (end - start));

export const textEntrance = (frame, start, duration = 12) => {
  const opacity = screenProgress(frame, start, start + duration);
  return {opacity, translateY: (1 - opacity) * 18};
};
