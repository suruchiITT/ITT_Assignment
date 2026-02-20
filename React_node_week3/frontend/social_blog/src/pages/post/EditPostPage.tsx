import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchPost
} from "../../redux/posts/postSlice";
import { fetchClient } from "../../api/fetchClient";
import {
  Container,
  Input,
  Textarea,
  Button
} from "../../styles/post/PostFormStyles";

export default function EditPostPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { post } =
    useAppSelector(
      state => state.posts
    );

  const [title,setTitle] =
    useState("");

  const [content,setContent] =
    useState("");

  useEffect(()=>{

    if(id)
      dispatch(fetchPost(id));

  },[id]);

  useEffect(()=>{

    if(post){

      setTitle(post.title);
      setContent(post.content);

    }

  },[post]);

  const submit = async () => {

    await fetchClient(
      `/posts/${id}`,
      {
        method:"PUT",
        body:JSON.stringify({
          title,
          content
        })
      }
    );

    navigate("/");

  };

  if(!post) return null;

  return (

    <Container>

      <Input
        value={title}
        onChange={e=>
          setTitle(
            e.target.value
          )
        }
      />

      <Textarea
        value={content}
        onChange={e=>
          setContent(
            e.target.value
          )
        }
      />

      <Button onClick={submit}>
        Update Post
      </Button>

    </Container>

  );

}
