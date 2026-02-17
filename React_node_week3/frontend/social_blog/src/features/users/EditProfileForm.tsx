import { useState } from "react";

import {
  useAppDispatch,
  useAppSelector
} from "../../app/hooks";

import {
  updateProfile
} from "./userSlice";

import {

  Page,
  Card,
  Header,
  ProfileImageWrapper,
  ProfileImage,
  CameraOverlay,
  Username,
  Email,
  Form,
  Label,
  Input,
  SaveButton

} from "./styles/EditProfileStyles";

export default function EditProfilePage(){

  const dispatch =
  useAppDispatch();

  const profile =
  useAppSelector(
    state=>state.users.profile
  );

  const [username,setUsername] =
  useState(profile?.username || "");

  const [image,setImage] =
  useState<File|null>(null);

  const imageUrl =
  image

  ?

  URL.createObjectURL(image)

  :

  profile?.profilePic

  ?

  `http://localhost:5000/${profile.profilePic}`

  :

  "/default-profile.png";



  const handleImageChange =
  (e:React.ChangeEvent<HTMLInputElement>)=>{

    const file =
    e.target.files?.[0];

    if(file &&
       file.type.startsWith("image/")
    ){

      setImage(file);

    }

  };



  const handleSubmit =
  (e:React.FormEvent)=>{

    e.preventDefault();

    const formData =
    new FormData();

    formData.append(
      "username",
      username
    );

    if(image){

      formData.append(
        "profilePic",
        image
      );

    }

    dispatch(updateProfile(formData));

  };



  return(

    <Page>

      <Card>

        <Header>

          <ProfileImageWrapper>

            <ProfileImage src={imageUrl}/>

            <CameraOverlay>

              Change Photo

              <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
              />

            </CameraOverlay>

          </ProfileImageWrapper>

          <div>

            <Username>
              {profile?.username}
            </Username>

            <Email>
              {profile?.email}
            </Email>

          </div>

        </Header>

        <Form onSubmit={handleSubmit}>

          <Label>
            Username
          </Label>

          <Input
          value={username}
          onChange={(e)=>
          setUsername(e.target.value)}
          />

          <SaveButton>

            Save Changes

          </SaveButton>

        </Form>

      </Card>

    </Page>

  );

}