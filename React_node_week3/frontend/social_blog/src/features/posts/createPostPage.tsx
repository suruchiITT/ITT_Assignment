import { useState, useRef } from "react";

import { useAppDispatch } from "../../app/hooks";

import { createPost } from "./PostSlice";

import {
  Container,
  Card,
  HeaderText,
  Title,
  SubText,
  Input,
  Textarea,
  FileInput,
  Button,
} from "./styles/createPostStyles";

export default function CreatePostPage() {

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e:any) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);

    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    dispatch(createPost(formData));

    setTitle("");

    setContent("");

    setImage(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }

  };

  return (

    <Container>

      <Card>

        <HeaderText>

          <Title>
            Create New Post
          </Title>

          <SubText>
            What would you like to share today?
          </SubText>

        </HeaderText>

        <form onSubmit={handleSubmit}>

          <Input
            placeholder="Post title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e)=>setContent(e.target.value)}
          />

          <FileInput
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e)=>
              setImage(e.target.files?.[0] || null)
            }
          />

          <Button>
            Publish Post
          </Button>

        </form>

      </Card>

    </Container>

  );

}
