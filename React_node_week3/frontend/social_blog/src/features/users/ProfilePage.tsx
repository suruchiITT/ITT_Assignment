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
