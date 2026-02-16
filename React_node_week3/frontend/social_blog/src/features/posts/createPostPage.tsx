import { useState } from "react";

import { useAppDispatch } from "../../app/hooks";

import { createPost }
from "./PostSlice";

import {

Container,
Card,
Input,
Textarea,
Button

} from "./styles/createPostStyles";

export default function CreatePostPage(){

const dispatch =
useAppDispatch();

const [title,setTitle] =
useState("");

const [content,setContent] =
useState("");

const [image,setImage] =
useState<File|null>(null);

const handleSubmit =
(e:React.FormEvent)=>{

e.preventDefault();

const formData =
new FormData();

formData.append("title",title);

formData.append("content",content);

if(image){

formData.append("image",image);

}

dispatch(createPost(formData));

};

return(

<Container>

<Card>

<h2>Create Post</h2>

<form onSubmit={handleSubmit}>

<Input
placeholder="Title"
onChange={(e)=>
setTitle(e.target.value)}
/>

<Textarea
placeholder="Content"
onChange={(e)=>
setContent(e.target.value)}
/>

<Input
type="file"
accept="image/*"
onChange={(e)=>
setImage(
e.target.files?.[0]||null)}
/>

<Button>
Post
</Button>

</form>

</Card>

</Container>

);

}
