import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import { useTypedSelector } from "./hooks/useTypedSelector";
import NotFound from "./pages/notFound";
import DefaultPage from "./pages/defaultPage/DefaultPage";
import AllUsers from "./pages/admin/users/AdminUsersView";
import CreateUser from "./pages/admin/users/AdminUsersCreate";
import UpdateUser from "./pages/admin/users/AdminUsersUpdate";
import AllRoles from "./pages/admin/role/AdminRolesView";
import CreateRole from "./pages/admin/role/AdminRolesCreate";
import UpdateRole from "./pages/admin/role/AdminRolesUpdate";

function App() {
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);
  return (
    <Routes>
      {isAuth && (
        <>
          {user.role === "Admin" && (
            // <Route path="/admin" element={<AllUsers />}>
            //   <Route index element={<AllUsers />} />
            //   <Route path="users" element={<AllUsers />} />
            //   <Route path="user/create" element={<CreateUser />} />
            //   <Route path="user/update/:userId" element={<UpdateUser />} />
            //   <Route path="roles" element={<AllRoles />} />
            //   <Route path="role/create" element={<CreateRole />} />
            //   <Route path="role/update/:userId" element={<UpdateRole />} />
            // </Route>
            <Route path="/admin" element={<Outlet />}>
               <Route index element={<AllUsers />} />
               <Route path="user/create" element={<CreateUser />} />
               <Route path="user/update/:userId" element={<UpdateUser />} />
               <Route path="roles" element={<AllRoles />} />
               <Route path="role/create" element={<CreateRole />} />
               <Route path="role/update/:userId" element={<UpdateRole />} />
            </Route>
            
          )}
          {/* {user.role === "User" && (
            <Route path="/dashboard" element={<DefaultPage />}>
              <Route index element={<DefaultPage />} />
            </Route>
          )} */}
        </>
      )}
      <Route path="/" element={<DefaultPage/>} />
      <Route path="/dashboard" element={<DefaultPage/>} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
