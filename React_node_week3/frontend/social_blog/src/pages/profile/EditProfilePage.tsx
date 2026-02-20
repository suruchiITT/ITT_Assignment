// import { useState, useEffect } from "react";

// import {
//   useAppDispatch,
//   useAppSelector
// } from "../../redux/hooks";

// import {
//   fetchProfile
// } from "../../redux/users/userSlice";

// import {
//   Container,
//   Input,
//   Button
// } from "../../styles/auth/AuthStyles";

// export default function EditProfilePage() {

//   const dispatch =
//     useAppDispatch();

//   const profile =
//     useAppSelector(
//       state => state.users.profile
//     );

//   const [username,setUsername] =
//     useState("");

//   const [image,setImage] =
//     useState<any>();

//   useEffect(()=>{

//     dispatch(fetchProfile());

//   },[]);

//   useEffect(()=>{

//     if(profile)
//       setUsername(
//         profile.username
//       );

//   },[profile]);

//   const submit=()=>{

//     const form =
//       new FormData();

//     form.append(
//       "username",
//       username
//     );

//     if(image)
//       form.append(
//         "profilePic",
//         image
//       );

//   };

//   return(

//     <Container>

//       <Input
//         value={username}
//         onChange={e=>
//           setUsername(
//             e.target.value
//           )
//         }
//       />

//       <Input
//         type="file"
//         onChange={e=>
//           setImage(
//             e.target.files?.[0]
//           )
//         }
//       />

//       <Button onClick={submit}>
//         Save
//       </Button>

//     </Container>

//   );

// }
