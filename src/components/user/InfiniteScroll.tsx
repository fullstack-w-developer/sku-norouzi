import React from "react";
import BaseInfiniteScroll from "react-infinite-scroll-component";

interface Props {
    dataLength: number;
    next: () => void;
    hasMore: boolean;
    children: React.ReactNode;
}
const InfiniteScroll = ({ dataLength, next, hasMore, children }: Props) => {
    return (
        <BaseInfiniteScroll
            dataLength={dataLength}
            next={next}
            hasMore={hasMore}
            loader={""}
            className="scroll-hide flex-1"
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b></b>
                </p>
            }
            releaseToRefreshContent={<h3 style={{ textAlign: "center" }}></h3>}
        >
            {children}
        </BaseInfiniteScroll>
    );
};

export default InfiniteScroll;
