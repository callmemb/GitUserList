import { Box } from "@mui/material";
import { ReactNode, useRef } from "react";

import InfiniteScroller from "react-infinite-scroller";


/**
 * Komponent doładowuje nową zawartość na bazie pozycji 'scrolla'.
 */

type InfiniteScrollProps = {
  getMore: () => void;
  hasMore: boolean;
  children: ReactNode;
};

export default function InfiniteScroll({
  getMore,
  hasMore,
  children,
}: InfiniteScrollProps) {
  const scrollableBox = useRef();

  return (
    <Box ref={scrollableBox} sx={{ flex: 1, overflowY: "auto" }}>
      <InfiniteScroller
        useWindow={false}
        loadMore={() => getMore()}
        hasMore={hasMore}
        getScrollParent={() => scrollableBox.current || null}
      >
        {children}
      </InfiniteScroller>
    </Box>
  );
}
