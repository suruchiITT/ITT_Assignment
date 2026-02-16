import { fetchClient }
from "./fetchClient";

export const loginApi = async (

  email: string,

  password: string

)=>{

  return await fetchClient(

    "/login",

    {

      method:"POST",

      body: JSON.stringify({

        email,

        password

      })

    }

  );

};

export const registerApi = async (

  formData: FormData

)=>{

  return await fetchClient(

    "/register",

    {

      method:"POST",

      body: formData

    }

  );

};
