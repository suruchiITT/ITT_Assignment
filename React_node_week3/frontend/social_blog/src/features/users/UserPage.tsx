import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector
} from "../../app/hooks";

import {
  fetchUsers
} from "./userSlice";

import UserCard
from "./UserCard";

import styled from "styled-components";

const Container =
styled.div`

  padding:20px;

`;

const Title =
styled.h2`

  margin-bottom:20px;

`;

const Grid =
styled.div`

  display:grid;

  grid-template-columns:
  repeat(auto-fill,minmax(250px,1fr));

  gap:20px;

`;

export default function UsersPage(){

  const dispatch =
  useAppDispatch();

  const users =
  useAppSelector(
    state => state.users.allUsers
  );

  useEffect(()=>{

    dispatch(fetchUsers());

  },[dispatch]);

  return(

    <Container>

      <Title>
        Users
      </Title>

      <Grid>

        {

          users.map(user=>(

            <UserCard

              key={user._id}

              user={user}

            />

          ))

        }

      </Grid>

    </Container>

  );

}
