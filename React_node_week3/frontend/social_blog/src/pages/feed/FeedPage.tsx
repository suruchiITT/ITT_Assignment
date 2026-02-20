import { useEffect } from "react";

import { useAppDispatch, useAppSelector }
from "../../redux/hooks";

import { fetchFeed }
from "../../redux/posts/postSlice";

import PostCard
from "../../components/post/PostCard";

import Loader
from "../../components/ui/Loader";

export default function FeedPage() {

  const dispatch =
    useAppDispatch();

  const { posts, page, loading } =
    useAppSelector(
      state => state.posts
    );

  useEffect(() => {

    dispatch(fetchFeed(page));

  }, []);

  if (loading)
    return <Loader />;

  return (

    <div style={{
      flex:1,
      padding:"20px"
    }}>

      {posts.map(
        post =>
          <PostCard
            key={post._id}
            post={post}
          />
      )}

    </div>

  );

}
