import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import BasicLayout from "../../components/layout/BasicLayout";
import { ComponentLoader } from "../../components/LoadingFallback";
import { useAdminAuthStore } from "../../store/authStore";
import { Auth, UnAuth } from "../ValidateAuth";
import { ProtectedRoute } from "../../components/ProtectedRoute";

const Login = lazy(() => import("../../pages/Admin/Login"));
const Dashboard = lazy(() => import("../../pages/Admin/Dashboard"));
const Users = lazy(() => import("../../pages/Admin/UserManagement/Users"));
const Roles = lazy(() => import("../../pages/Admin/UserManagement/Roles"));
const AccountSettings = lazy(() => import("../../pages/Admin/AccountSettings"));

const AdminRoute = () => {
  const navigations = [
    {
      route: "/dashboard",
      name: "Dashboard",
      label: "Dashboard",
      icon: <HomeOutlined className="h-5 w-5" />,
      component: (
        <Suspense fallback={<ComponentLoader />}>
          <ProtectedRoute module="dashboard" accessLevel="read">
            <Dashboard />
          </ProtectedRoute>
        </Suspense>
      ),
      permission: { module: "dashboard", submodule: null, accessLevel: "read" },
      isFilter: true,
      isShow: true,
    },
    {
      key: "user-management",
      name: "User Management",
      label: "User Management",
      icon: <UserOutlined className="h-5 w-5" />,
      permission: {
        anyOf: [
          { module: "users", submodule: "list", accessLevel: "read" },
          { module: "users", submodule: "roles", accessLevel: "read" },
          { module: "users", submodule: "positions", accessLevel: "read" },
        ],
      },
      isFilter: true,
      isShow: true,
      children: [
        {
          route: "/users",
          name: "Users",
          label: "Users",
          component: (
            <Suspense fallback={<ComponentLoader />}>
              <ProtectedRoute
                module="users"
                submodule="list"
                accessLevel="read"
              >
                <Users />
              </ProtectedRoute>
            </Suspense>
          ),
          permission: {
            module: "users",
            submodule: "list",
            accessLevel: "read",
          },
          isFilter: true,
          isShow: true,
        },
        {
          route: "/roles",
          name: "Roles",
          label: "Roles",
          component: (
            <Suspense fallback={<ComponentLoader />}>
              <ProtectedRoute
                module="users"
                submodule="roles"
                accessLevel="read"
              >
                <Roles />
              </ProtectedRoute>
            </Suspense>
          ),
          permission: {
            module: "users",
            submodule: "roles",
            accessLevel: "read",
          },
          isFilter: true,
          isShow: true,
        },
      ],
    },
  ].map((page) => {
    if (page.children) {
      return {
        ...page,
        children: page.children.map((child) => ({
          ...child,
          route: `/admin/${page.key}` + child.route,
        })),
      };
    }
    return { ...page, route: "/admin" + page.route };
  });

  return (
    <Routes>
      <Route
        element={
          <UnAuth store={useAdminAuthStore} redirect="/admin/dashboard" />
        }
      >
        <Route
          path="/"
          index
          element={
            <Suspense fallback={<ComponentLoader />}>
              <Login />
            </Suspense>
          }
        />
      </Route>

      <Route element={<Auth store={useAdminAuthStore} redirect="/admin" />}>
        <Route
          element={
            <BasicLayout navigations={navigations} store={useAdminAuthStore} />
          }
        >
          {navigations
            .filter((page) => page.isShow)
            .flatMap((page) => {
              // If page has children, return routes for children
              if (page.children) {
                return page.children
                  .filter((child) => child.isShow)
                  .map((child) => {
                    const routePath = child.route.replace("/admin/", "");
                    return (
                      <Route
                        key={child.route}
                        path={routePath}
                        element={child.component}
                      />
                    );
                  });
              }
              // Otherwise return route for the page itself
              const routePath = page.route.replace("/admin/", "");
              return (
                <Route
                  key={page.route}
                  path={routePath}
                  element={page.component}
                />
              );
            })}

          <Route
            path="account-settings"
            element={
              <Suspense fallback={<ComponentLoader />}>
                <AccountSettings />
              </Suspense>
            }
          />

          <Route path="*" element={<div>Page Not Found</div>} />
          <Route
            path="account-settings"
            element={
              <Suspense fallback={<ComponentLoader />}>
                <AccountSettings />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoute;
