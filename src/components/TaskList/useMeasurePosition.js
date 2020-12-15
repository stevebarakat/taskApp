import { useEffect, useRef } from "react";

export function useMeasurePosition(update) {
  // Using a `ref` to access the DOM element that the `motion.li` produces.
  // It measures its height and position, for deciding when the current
  // element being dragged should switch places with its siblings.
  const ref = useRef(null);

  // Updating measured position of the item to calculate when to rearrange it.
  useEffect(() => {
    update({
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    });
  });

  return ref;
}
