import { useState } from "react";

import { useAppDispatch } from "../../app/hooks";

import { createPost } from "./PostSlice";

import { Form, Input, Button, Message } from "./styles/PostFormStyles";

export default function PostForm() {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);

    formData.append("content", content);

    dispatch(createPost(formData));

    setTitle("");

    setContent("");
    console.log("title:", title);
    setMessage("Post created successfully");
  };

  return (
    <Form onSubmit={handleSubmit}>
      {message && <Message>{message}</Message>}

      <Input
        value={title}
        type="text"
        placeholder="Enter title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        value={content}
        type="text"
        placeholder="Enter content"
        onChange={(e) => setContent(e.target.value)}
      />

      <Button type="submit">Create Post</Button>
    </Form>
  );
}
