import { useEffect, useState } from "react";

export function useRafScrollY() {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setY(window.scrollY || 0);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return y;
}
