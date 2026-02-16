import { useEffect } from "react";
import Header from "../components/Header";

import Sidebar from "../components/Sidebar";

import { Outlet }
from "react-router-dom";

import styled from "styled-components";

import { useAppDispatch } from "../app/hooks";
import { fetchProfile } from "../features/users/userSlice";

const Layout = styled.div`

  display: flex;

`;

const Main = styled.div`

  flex: 1;

  background: #f0f2f5;

  min-height: 100vh;

`;

export default function FeedLayout(){

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return(

    <>

      <Header/>

      <Layout>

        <Sidebar/>

        <Main>

          <Outlet/>

        </Main>

      </Layout>

    </>

  );

}
