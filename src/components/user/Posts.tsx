import { Spin } from "antd";
import CardPost from "./CardPost";
import InfiniteScroll from "./InfiniteScroll";
import { Posts } from "../../types/common";
import useAuthStore from "../../stores/auth-store";
interface Props {
    posts: Posts;
    fetchMoreData: () => void;
    isLoading: boolean;
    hasMore: boolean;
}
const Posts = ({ posts, fetchMoreData, isLoading, hasMore }: Props) => {
    const { user } = useAuthStore();

    return (
        <div className="w-[98%] mx-auto ">
            <InfiniteScroll dataLength={posts.total} next={fetchMoreData} hasMore={hasMore}>
                <Spin spinning={isLoading}>
                    <div
                        className={`grid  gap-10 mx-auto mt-10 pb-10 ${user ? "w-[90%] grid-cols-1 lg:grid-cols-2" : "w-[95%] grid-cols-1 lg:grid-cols-3"
                            }`}
                    >
                        {posts.posts.map((post) => (
                            <CardPost post={post} key={post._id} />
                        ))}
                    </div>
                </Spin>
            </InfiniteScroll>
        </div>
    );
};

export default Posts;
