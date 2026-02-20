import {
  Container,
  Item,
  Input
} from "../../styles/post/CommentStyles";

import {
  addComment
} from "../../redux/posts/postSlice";

import {
  useAppDispatch
} from "../../redux/hooks";

import { useState } from "react";

export default function CommentSection({ post }: any) {

  const dispatch =
    useAppDispatch();

  const [text,setText] =
    useState("");

  const submit = () => {

    if(!text) return;

    dispatch(addComment({
      id: post._id,
      text
    }));

    setText("");

  };

  return (

    <Container>

      {post.comments.map(
        (c:any)=>(
          <Item key={c._id}>
            <b>{c.user.username}</b>
            {c.text}
          </Item>
        )
      )}

      <Input
        value={text}
        onChange={e=>
          setText(
            e.target.value
          )
        }
        onKeyDown={e=>
          e.key==="Enter" &&
          submit()
        }
        placeholder="Comment"
      />

    </Container>

  );

}
