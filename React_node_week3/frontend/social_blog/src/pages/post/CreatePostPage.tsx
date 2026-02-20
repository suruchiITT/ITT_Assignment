import { useState }
from "react";

import { useAppDispatch }
from "../../redux/hooks";

import { createPost }
from "../../redux/posts/postSlice";

import {
  Container,
  Input,
  Textarea,
  Button
} from "../../styles/post/PostFormStyles";

export default function CreatePostPage() {

  const dispatch =
    useAppDispatch();

  const [title,setTitle] =
    useState("");

  const [content,setContent] =
    useState("");

  const [image,setImage] =
    useState<any>();

  const submit = () => {

    const form =
      new FormData();

    form.append("title",title);
    form.append("content",content);

    if(image)
      form.append("image",image);

    dispatch(createPost(form));

  };

  return (

    <Container>

      <Input
        placeholder="Title"
        value={title}
        onChange={e =>
          setTitle(e.target.value)
        }
      />

      <Textarea
        placeholder="Content"
        value={content}
        onChange={e =>
          setContent(e.target.value)
        }
      />

      <input
        type="file"
        onChange={e =>
          setImage(
            e.target.files?.[0]
          )
        }
      />

      <Button onClick={submit}>
        Post
      </Button>

    </Container>

  );

}
