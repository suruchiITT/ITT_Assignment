import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  Wrapper,
  Content
} from "../styles/layout/FeedLayoutStyles";

export default function FeedLayout(
  { children }: any
) {

  return (

    <Wrapper>

      <Header />

      <Content>

        <Sidebar />

        {children}

      </Content>

    </Wrapper>

  );

}
