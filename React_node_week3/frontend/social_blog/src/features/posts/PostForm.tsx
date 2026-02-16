import {
  useState
} from "react";

import {
  useAppDispatch
} from "../../app/hooks";

import {
  createPost
} from "./PostSlice";

import {

  Form,

  Input,

  Button

} from "./styles/PostFormStyles";

export default function PostForm(){

  const dispatch =
  useAppDispatch();

  const [title,
  setTitle] =
  useState("");

  const [content,
  setContent] =
  useState("");

  const handleSubmit =
  async (e:any)=>{

    e.preventDefault();

    const formData =
    new FormData();

    formData.append(
      "title",
      title
    );

    formData.append(
      "content",
      content
    );

    await dispatch(
      createPost(formData)
    );

  };

  return(

    <Form onSubmit={handleSubmit}>

      <Input
      placeholder="Title"
      onChange={(e)=>
      setTitle(
      e.target.value)}
      />

      <Input
      placeholder="Content"
      onChange={(e)=>
      setContent(
      e.target.value)}
      />

      <Button>
        Create Post
      </Button>

    </Form>

  );

}
