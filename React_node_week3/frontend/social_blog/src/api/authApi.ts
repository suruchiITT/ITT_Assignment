import { fetchClient } from "./fetchClient";

export const loginApi = async (data: any) => {

const res = await fetchClient("/login", {
method: "POST",
body: JSON.stringify(data)
});

return res.data;

};

export const registerApi = async (formData: FormData) => {

const res = await fetchClient("/register", {
method: "POST",
body: formData
});

return res.data;

};
