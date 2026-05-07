import { HomeOutlined } from "@ant-design/icons";
import { Building2, Settings, Users } from "lucide-react";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import BasicLayout from "../../components/layout/BasicLayout";
import { ComponentLoader } from "../../components/LoadingFallback";
import { useSuperAdminAuthStore } from "../../store/authStore";
import { Auth, UnAuth } from "../ValidateAuth";

const Login = lazy(() => import("../../pages/SuperAdmin/Login"));
const Dashboard = lazy(() => import("../../pages/SuperAdmin/Dashboard"));
const Clinics = lazy(() => import("../../pages/SuperAdmin/Clinics"));

const SuperAdminRoute = () => {
  // ========== Navigation Configuration ==========
  const navigations = [
    {
      route: "/dashboard",
      name: "Dashboard",
      label: "Dashboard",
      icon: <HomeOutlined className="h-5 w-5" />,
      component: (
        <Suspense fallback={<ComponentLoader />}>
          <Dashboard />
        </Suspense>
      ),
      isFilter: true,
      isShow: true,
    },
    {
      route: "/clinics",
      name: "Clinics",
      label: "Clinic Management",
      icon: <Building2 className="h-5 w-5" />,
      component: (
        <Suspense fallback={<ComponentLoader />}>
          <Clinics />
        </Suspense>
      ),
      isFilter: true,
      isShow: true,
    },
    {
      route: "/users",
      name: "Users",
      label: "User Management",
      icon: <Users className="h-5 w-5" />,
      component: (
        <Suspense fallback={<ComponentLoader />}>
          <div className="p-6">
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-gray-600 mt-2">Manage all system users</p>
          </div>
        </Suspense>
      ),
      isFilter: true,
      isShow: true,
    },
    {
      route: "/settings",
      name: "Settings",
      label: "System Settings",
      icon: <Settings className="h-5 w-5" />,
      component: (
        <Suspense fallback={<ComponentLoader />}>
          <div className="p-6">
            <h1 className="text-2xl font-bold">System Settings</h1>
            <p className="text-gray-600 mt-2">Configure system settings</p>
          </div>
        </Suspense>
      ),
      isFilter: true,
      isShow: true,
    },
  ].map((page) => ({ ...page, route: "/superadmin" + page.route }));

  // ========== Render Routes ==========
  return (
    <Routes>
      <Route
        element={
          <UnAuth
            store={useSuperAdminAuthStore}
            redirect="/superadmin/dashboard"
          />
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

      {/* Protected Route Wrapper */}
      <Route
        element={<Auth store={useSuperAdminAuthStore} redirect="/superadmin" />}
      >
        {/* Main Layout Route */}
        <Route
          element={
            <BasicLayout
              navigations={navigations}
              store={useSuperAdminAuthStore}
            />
          }
        >
          {navigations
            .filter((page) => page.isShow)
            .map((page) => {
              const routePath = page.route.replace("/superadmin/", "");
              return (
                <Route
                  key={page.route}
                  path={routePath}
                  element={page.component}
                />
              );
            })}

          {/* Fallback Route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default SuperAdminRoute;
