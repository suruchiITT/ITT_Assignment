import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPost } from "../../redux/posts/postSlice";
import PostCard from "../../components/post/PostCard";
import Loader from "../../components/ui/Loader";

export default function PostDetailPage() {

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { post, loading } =
    useAppSelector(state => state.posts);

  useEffect(() => {

    if (id)
      dispatch(fetchPost(id));

  }, [id]);

  if (loading || !post)
    return <Loader />;

  return (
    <div style={{
      flex:1,
      padding:"20px"
    }}>
      <PostCard post={post} />
    </div>
  );

}
