import {
  useAppSelector
} from "../../redux/hooks";

import UserCard
from "../../components/user/UserCard";

export default function FollowingPage(){

  const profile =
    useAppSelector(
      state => state.users.profile
    );

  if(!profile) return null;

  return(

    <div style={{
      flex:1,
      padding:"20px"
    }}>

      {profile.following.map(
        (id:any)=>(
          <UserCard
            key={id}
            user={{
              _id:id,
              username:id
            }}
          />
        )
      )}

    </div>

  );

}
