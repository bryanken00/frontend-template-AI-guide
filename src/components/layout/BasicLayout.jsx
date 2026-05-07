import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { usePermissions } from "../../hooks/usePermissions";
import { useWindowSize } from "../../hooks/useWindowSize";
import { filterNavigationByPermissions } from "../../utils/filterNavigation";
import Sidebar from "./Sidebar";

// Derive a readable page title from the current pathname + nav tree
const getPageTitle = (pathname, navigations) => {
  for (const nav of navigations) {
    if (nav.children) {
      for (const child of nav.children) {
        if (
          pathname === child.route ||
          pathname.startsWith(child.route + "/")
        ) {
          return { group: nav.label, title: child.label };
        }
      }
    } else if (pathname === nav.route || pathname.startsWith(nav.route + "/")) {
      return { group: null, title: nav.label };
    }
  }
  return { group: null, title: "Dashboard" };
};

const BasicLayout = ({ navigations, store }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { width } = useWindowSize();
  const { organization, userData, reset } = store();
  const { hasPermission, isLoading } = usePermissions();
  const location = useLocation();

  const isMobile = width < 992;

  const filteredNavigations = useMemo(() => {
    if (isLoading) return [];
    return filterNavigationByPermissions(navigations, hasPermission);
  }, [navigations, hasPermission, isLoading]);

  const { group, title } = getPageTitle(location.pathname, filteredNavigations);

  const handleCollapse = (value) => setCollapsed(value);

  const userMenuItems = [
    {
      key: "info",
      label: (
        <div className="px-1 py-2 min-w-[180px]">
          <div className="font-semibold text-slate-800">
            {userData && [userData.firstName, userData.lastName].join(" ")}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{userData?.email}</div>
          {userData?.roleName && (
            <div className="text-xs text-blue-500 mt-0.5">
              {userData.roleName}
            </div>
          )}
        </div>
      ),
      disabled: true,
    },
    // { type: "divider" },
    // {
    //   key: "logout",
    //   label: "Sign Out",
    //   icon: <LogoutOutlined />,
    //   danger: true,
    //   onClick: reset,
    // },
  ];

  // Content margin accounts for sidebar width
  const contentMargin = isMobile ? 0 : collapsed ? 0 : 250;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        collapsed={isMobile ? collapsed : collapsed}
        handleCollapse={handleCollapse}
        navigations={filteredNavigations}
        handleLogout={reset}
        userData={userData}
        organization={organization}
      />

      {/* Main area */}
      <div
        className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden transition-all duration-200"
        style={{ marginLeft: contentMargin }}
      >
        {/* Topbar */}
        <header
          className="shrink-0 flex items-center justify-between px-4 md:px-6 h-14"
          style={{
            backgroundColor: "#3b82f6",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        >
          {/* Left — toggle + breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="flex items-center justify-center w-8 h-8 rounded-lg text-white/80 hover:bg-white/20 hover:text-white transition-colors shrink-0"
              onClick={() => handleCollapse(!collapsed)}
            >
              {collapsed ? (
                <MenuFoldOutlined className="text-base" />
              ) : (
                <MenuUnfoldOutlined className="text-base" />
              )}
            </button>

            <div className="flex items-center gap-1.5 min-w-0">
              {group && (
                <>
                  <span className="text-xs text-white/60 truncate hidden sm:block">
                    {group}
                  </span>
                  <span className="text-white/40 hidden sm:block">/</span>
                </>
              )}
              <span className="text-sm font-semibold text-white truncate">
                {title}
              </span>
            </div>
          </div>

          {/* Right — actions + user */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Notification bell */}
            {/* <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
              <Badge dot offset={[-2, 2]}>
                <BellOutlined className="text-base" />
              </Badge>
            </button> */}

            {/* User dropdown */}
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors">
                <Avatar
                  size={30}
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.25)",
                    flexShrink: 0,
                  }}
                />
                {width > 640 && (
                  <span className="text-sm font-medium text-white max-w-[120px] truncate">
                    {userData &&
                      [userData.firstName, userData.lastName].join(" ")}
                  </span>
                )}
              </button>
            </Dropdown>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-linear-to-br from-blue-50 via-white to-indigo-50/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BasicLayout;
