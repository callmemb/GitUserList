import { Box } from "@mui/material";
import { ReactNode, useRef } from "react";

import InfiniteScroller from "react-infinite-scroller";

type Props = {
  getMore: () => void;
  hasMore: boolean;
  children: ReactNode;
};

export default function InfiniteScroll({ getMore, hasMore, children }: Props) {
  const scrollableBox = useRef();

  return (
    <Box ref={scrollableBox} sx={{ flex: 1, overflowY: "scroll" }}>
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
