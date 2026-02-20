import {
  Container,
  Input,
  Textarea,
  Button
} from "../../styles/post/PostFormStyles";

export default function PostForm({
  title,
  content,
  setTitle,
  setContent,
  submit
}:any){

  return(

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
        Submit
      </Button>

    </Container>

  );

}
