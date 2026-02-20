import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector
} from "../../redux/hooks";

import {
  fetchUsers
} from "../../redux/users/userSlice";

import UserCard
from "../../components/user/UserCard";

export default function UserProfilePage() {

  const dispatch =
    useAppDispatch();

  const users =
    useAppSelector(
      state => state.users.users
    );

  useEffect(()=>{

    dispatch(fetchUsers());

  },[]);

  return (

    <div style={{
      flex:1,
      padding:"20px"
    }}>

      {users.map(user=>
        <UserCard
          key={user._id}
          user={user}
        />
      )}

    </div>

  );

}
