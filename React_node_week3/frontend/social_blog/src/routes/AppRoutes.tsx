import { Routes,Route,Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import FeedPage from "../pages/feed/FeedPage";
import FeedLayout from "../layout/FeedLayout";
import { getToken } from "../utils/token";

export default function AppRoutes(){

const token=getToken();

if(!token){
return(
<Routes>
<Route path="/login" element={<LoginPage/>}/>
<Route path="/register" element={<RegisterPage/>}/>
<Route path="*" element={<Navigate to="/login" replace/>}/>
</Routes>
);
}

return(
<FeedLayout>
<Routes>
<Route path="/" element={<FeedPage/>}/>
<Route path="*" element={<Navigate to="/" replace/>}/>
</Routes>
</FeedLayout>
);

}
