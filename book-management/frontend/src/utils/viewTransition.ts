export const onToggleTheme = (
  e: React.MouseEvent,
  isDark: boolean,
  callback: VoidFunction,
) => {
  if (!("startViewTransition" in document)) {
    callback();
    return;
  }
  const transiton = document.startViewTransition(callback);
  const x = e.clientX;
  const y = e.clientY;
  const targetRadius = Math.hypot(
    Math.max(window.innerWidth, window.innerWidth - x),
    Math.max(window.innerHeight, window.innerHeight - y),
  );
  transiton.ready.then(() => {
    const clipPath = [
      `circle(0% at ${x}px ${y}px)`,
      `circle(${targetRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: isDark ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: isDark
          ? "::view-transition-new(root)"
          : "::view-transition-old(root)",
      },
    );
  });
};
