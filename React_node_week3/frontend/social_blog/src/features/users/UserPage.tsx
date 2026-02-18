import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { fetchUsers } from "./userSlice";

import UserCard from "./UserCard";

import { Container, Title, Grid } from "./styles/UserPageStyles";

export default function UsersPage() {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.users.profile);

  const allUsers = useAppSelector((state) => state.users.allUsers);

  const users = allUsers.filter((user) => user._id !== currentUser?._id);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Container>
      <Title>Discover and connect with new people  </Title>

      <Grid>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </Grid>
    </Container>
  );
}
