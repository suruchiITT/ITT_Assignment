// import { useEffect } from "react";

// import { useNavigate } from "react-router-dom";

// import {
//   useAppDispatch,
//   useAppSelector
// } from "../../app/hooks";

// import {
//   fetchProfile
// } from "./userSlice";

// import EditProfileForm
// from "./EditProfileForm";

// import {

//   PageContainer,
//   Card,
//   Image,
//   Username,
//   Email,
//   Header,
//   UserInfo,
//   StatsContainer,
//   StatItem,
//   StatNumber,
//   StatLabel

// } from "./styles/ProfileStyles";

// export default function ProfilePage(){

//   const dispatch =
//   useAppDispatch();

//   const navigate =
//   useNavigate();

//   const profile =
//   useAppSelector(
//     state=>state.users.profile
//   );

//   useEffect(()=>{

//     dispatch(fetchProfile());

//   },[]);

//   if(!profile){

//     return null;

//   }

//   const imageUrl =
//   profile.profilePic
//   ?
//   `http://localhost:5000/${profile.profilePic}`
//   :
//   "/default-profile.png";

//   return(
//     <Card>

// <Header>

// <Image src={imageUrl}/>

// <UserInfo>

// <Username>
// {profile.username}
// </Username>

// <Email>
// {profile.email}
// </Email>

// <StatsContainer>

// <StatItem onClick={()=>navigate("/followers")}>

// <StatNumber>
// {profile.followers.length}
// </StatNumber>

// <StatLabel>
// followers
// </StatLabel>

// </StatItem>

// <StatItem onClick={()=>navigate("/following")}>

// <StatNumber>
// {profile.following.length}
// </StatNumber>

// <StatLabel>
// following
// </StatLabel>

// </StatItem>

// </StatsContainer>

// </UserInfo>

// </Header>

// <EditProfileForm/>

// </Card>


//     // <PageContainer>

//     //   <Card>

//     //     <Image src={imageUrl}/>

//     //     <Username>
//     //       {profile.username}
//     //     </Username>

//     //     <Email>
//     //       {profile.email}
//     //     </Email>

//     //     <StatsContainer>

//     //       <StatItem
//     //       onClick={() =>
//     //       navigate("/followers")}>

//     //         <StatNumber>
//     //           {profile.followers.length}
//     //         </StatNumber>

//     //         <StatLabel>
//     //           Followers
//     //         </StatLabel>

//     //       </StatItem>

//     //       <StatItem
//     //       onClick={() =>
//     //       navigate("/following")}>

//     //         <StatNumber>
//     //           {profile.following.length}
//     //         </StatNumber>

//     //         <StatLabel>
//     //           Following
//     //         </StatLabel>

//     //       </StatItem>

//     //     </StatsContainer>

//     //     <EditProfileForm/>

//     //   </Card>

//     // </PageContainer>

//   );

// }
import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector
} from "../../app/hooks";

import {
  fetchProfile
} from "./userSlice";

import {

  PageContainer,
  Container,
  Header,
  ProfileImage,
  UserSection,
  UsernameRow,
  Username,
  EditButton,
  StatsRow,
  Stat,
  Bold,
  Bio,
  Divider,
  PostGrid,
  PostImage

} from "./styles/ProfileStyles";
import { useNavigate } from "react-router-dom";

export default function ProfilePage(){
  const navigate = useNavigate();

  const dispatch =
  useAppDispatch();

  const profile =
  useAppSelector(
    state=>state.users.profile
  );

  const posts =
  useAppSelector(
    state=>state.posts.posts
  );

  useEffect(()=>{

    dispatch(fetchProfile());

  },[dispatch]);

  if(!profile) return null;

  const imageUrl =
  profile.profilePic

  ?

  `http://localhost:5000/${profile.profilePic}`

  :

  "/default-profile.png";

  return(

    <PageContainer>

      <Container>

        <Header>

          <ProfileImage src={imageUrl}/>

          <UserSection>

            <UsernameRow>

              <Username>

                {profile.username}

              </Username>

              <EditButton onClick={()=>navigate("/Editprofile")}>

                Edit profile

              </EditButton>

            </UsernameRow>

            <StatsRow>

              <Stat>

                <Bold>

                  {posts.length}

                </Bold>

                {" "}posts

              </Stat>

              <Stat onClick={() =>navigate("/followers")}>

                <Bold>

                  {profile.followers.length}

                </Bold>

                {" "}followers

              </Stat>

              <Stat onClick={() => navigate("/following")}>

                <Bold>

                  {profile.following.length}

                </Bold>

                {" "}following

              </Stat>

            </StatsRow>

            <Bio>

              <Bold>

                {profile.username}

              </Bold>

              <div>

                {profile.email}

              </div>

            </Bio>

          </UserSection>

        </Header>

        <Divider/>

        <PostGrid>

          {

            posts.map(post=>(

              post.image &&

              <PostImage

                key={post._id}

                src={`http://localhost:5000/${post.image}`}

              />

            ))

          }

        </PostGrid>

      </Container>

    </PageContainer>

  );

}
