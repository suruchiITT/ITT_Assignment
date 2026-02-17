import {
  useState
} from "react";

import {
  useAppDispatch,
  useAppSelector
} from "../../app/hooks";

import {
  deletePost,
  editPost
} from "./PostSlice";

import type {
  Post
} from "../../types/PostTypes";

import {

  Card,
  Author,
  Title,
  Content,
  Image,
  Button,
  EditInput,
  EditTextarea,
  ButtonRow

} from "./styles/PostCardStyles";

export default function PostCard({

  post

}:{

  post:Post

}){

  const dispatch=
  useAppDispatch();

  const profile=
  useAppSelector(
    state=>state.users.profile
  );



  const isOwner=

  profile?._id?.toString()

  ===

  post.author._id?.toString();



  const [editing,setEditing]=
  useState(false);

  const [title,setTitle]=
  useState(post.title);

  const [content,setContent]=
  useState(post.content);



  const handleSave=()=>{

    dispatch(editPost({

      postId:post._id,
      title,
      content

    }));

    setEditing(false);

  };



  return(

    <Card>

      <Author>

        {post.author.username}

      </Author>



      {

        editing ?

        <>

          <EditInput

          value={title}

          onChange={(e)=>

          setTitle(e.target.value)}

          />



          <EditTextarea

          value={content}

          onChange={(e)=>

          setContent(e.target.value)}

          />



        </>

        :

        <>

          <Title>

            {post.title}

          </Title>



          <Content>

            {post.content}

          </Content>

        </>

      }



      {

        post.image &&

        <Image

        src={`http://localhost:5000/${post.image}`}

        />

      }



      {

        isOwner &&

        <ButtonRow>

          {

            editing ?

            <Button

            onClick={handleSave}>

              Save

            </Button>

            :

            <Button

            onClick={()=>

            setEditing(true)}>

              Edit

            </Button>

          }



          <Button

          onClick={()=>

          dispatch(deletePost(post._id))}>

            Delete

          </Button>

        </ButtonRow>

      }

    </Card>

  );

}
