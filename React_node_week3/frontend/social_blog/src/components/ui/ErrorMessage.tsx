import { Container } from "../../styles/ui/ErrorStyles";

export default function ErrorMessage(
  { message }: any
) {

  return (
    <Container>
      {message}
    </Container>
  );

}
