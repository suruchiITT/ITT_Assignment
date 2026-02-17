import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { fetchFeed } from "./PostSlice";

import PostCard from "./PostCard";

import type { Post } from "../../types/PostTypes";

import { Container, LoadText } from "./styles/FeedStyles";

export default function FeedPage() {
  const dispatch = useAppDispatch();

  const { posts, page, loading, hasMore } = useAppSelector(
    (state) => state.posts,
  );

  useEffect(() => {
    dispatch(fetchFeed(1));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 50 &&
        !loading &&
        hasMore
      ) {
        dispatch(fetchFeed(page));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading, hasMore, dispatch]);

  return (
    <Container>
      {posts.map((post: Post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {loading && <LoadText>Loading...</LoadText>}
    </Container>
  );
}
