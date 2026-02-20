import {
  Container,
  Header,
  Username,
  Image,
  Content,
  Actions,
  Button,
  CommentInput,
  CommentList,
  CommentItem
} from "../../styles/post/PostCardStyles";

import { useAppDispatch } from "../../redux/hooks";

import {
  likePost,
  unlikePost,
  addComment
} from "../../redux/posts/postSlice";

import { BASE_URL } from "../../utils/constants";

import { useState } from "react";

export default function PostCard({ post }: any) {

  const dispatch = useAppDispatch();

  const [text, setText] = useState("");

  const liked =
    post.likes.includes(
      localStorage.getItem("userId")
    );

  const handleLike = () => {

    if (liked)
      dispatch(unlikePost(post._id));

    else
      dispatch(likePost(post._id));

  };

  const handleComment = () => {

    if (!text) return;

    dispatch(
      addComment({
        id: post._id,
        text
      })
    );

    setText("");

  };

  return (

    <Container>

      <Header>

        <Username>
          {post.author.username}
        </Username>

      </Header>

      {post.image &&

        <Image
          src={`${BASE_URL}/${post.image}`}
        />

      }

      <Content>
        {post.content}
      </Content>

      <Actions>

        <Button onClick={handleLike}>
          {liked ? "Unlike" : "Like"}
        </Button>

        <span>
          {post.likes.length} likes
        </span>

      </Actions>

      <CommentInput
        value={text}
        onChange={e =>
          setText(e.target.value)
        }
        placeholder="Add comment"
        onKeyDown={e =>
          e.key === "Enter" &&
          handleComment()
        }
      />

      <CommentList>

        {post.comments.map(
          (c: any) => (

            <CommentItem key={c._id}>
              <b>{c.user.username}</b>
              {c.text}
            </CommentItem>

          )
        )}

      </CommentList>

    </Container>

  );

}
