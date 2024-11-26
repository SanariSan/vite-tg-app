import { useEffect, useState } from 'react';

const seenTags = new Set<string>();

export const useTrackFirstMount = (tag: string) => {
  const [isMounted, setIsVisible] = useState(seenTags.has(tag));

  useEffect(() => {
    if (!seenTags.has(tag)) {
      seenTags.add(tag);
      requestAnimationFrame(() => setIsVisible(true));
    }
  }, [tag]);

  return { isMounted };
};
