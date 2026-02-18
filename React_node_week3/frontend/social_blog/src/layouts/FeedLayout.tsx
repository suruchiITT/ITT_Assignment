import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { fetchProfile } from "../features/users/userSlice";
import {
  PageWrapper,
  ContentWrapper,
  SidebarArea,
  Main
} from "./FeedLayoutStyles";

export default function FeedLayout(){

  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchProfile());
  },[dispatch]);

  return(

    <PageWrapper>

      <Header />

      <ContentWrapper>

        <SidebarArea>
          <Sidebar />
        </SidebarArea>

        <Main>
          <Outlet />
        </Main>

      </ContentWrapper>

    </PageWrapper>

  );

}
