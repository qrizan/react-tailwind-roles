import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./private";

const Loader = lazy(() => import("../components/Base/Loader.jsx"));

const Login = lazy(() => import("../components/Login.jsx"));
const Dashboard = lazy(() => import("../components/Pages/Dashboard/Index.jsx"));

const Permissions = lazy(() => import("../components/Pages/Permissions/Index.jsx"));

const Roles = lazy(() => import("../components/Pages/Roles/Index.jsx"));
const RoleCreate = lazy(() => import("../components/Pages/Roles/Create.jsx"));
const RoleEdit = lazy(() => import("../components/Pages/Roles/Edit.jsx"));

const Users = lazy(() => import("../components/Pages/Users/Index.jsx"));
const UserCreate = lazy(() => import("../components/Pages/Users/Create.jsx"));
const UserEdit = lazy(() => import("../components/Pages/Users/Edit.jsx"));

const Categories = lazy(() => import("../components/Pages/Categories/Index.jsx"));
const CategoryCreate = lazy(() => import("../components/Pages/Categories/Create.jsx"));
const CategoryEdit = lazy(() => import("../components/Pages/Categories/Edit.jsx"));

const Posts = lazy(() => import("../components/Pages/Posts/Index.jsx"));
const PostCreate = lazy(() => import("../components/Pages/Posts/Create.jsx"));
const PostEdit = lazy(() => import("../components/Pages/Posts/Edit.jsx"));

const Forbidden = lazy(() => import("../components/Forbidden"));


const RoutesIndex = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/permissions"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <Permissions />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/roles"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <Roles />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/roles/create"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <RoleCreate />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/roles/edit/:id"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <RoleEdit />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/users"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/users/create"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <UserCreate />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/users/edit/:id"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <UserEdit />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/categories"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/categories/create"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <CategoryCreate />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/categories/edit/:id"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <CategoryEdit />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/posts"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/posts/create"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <PostCreate />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/posts/edit/:id"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <PostEdit />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="forbidden"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute>
                <Forbidden />
              </PrivateRoute>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesIndex;
