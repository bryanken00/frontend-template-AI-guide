import { LoginOutlined, SettingOutlined } from "@ant-design/icons";
import { App, Drawer } from "antd";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { logo } from "../../assets/images/logos";
import { useWindowSize } from "../../hooks/useWindowSize";

// ── Theme tokens (aligned with index.css) ───────────────────────────────────
const T = {
  bg: "#ffffff",
  border: "#e2e8f0",
  activeBg: "#dbeafe", // primary-pale
  activeText: "#3b82f6", // primary-dark
  activeDot: "#3b82f6", // primary-color
  hoverBg: "#f1f5f9", // bg-secondary
  groupBg: "#f8fafc", // bg-primary
  textDefault: "#6b7280", // text-secondary
  textBright: "#1f2937", // text-dark
  textMuted: "#9ca3af", // text-muted
  logoutText: "#ef4444",
  logoutHover: "#fef2f2",
  avatarBg: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)", // gradient-primary
};

// ── Leaf nav item ────────────────────────────────────────────────────────────
const NavItem = ({ item, isActive, onClick, depth = 0 }) => (
  <Link to={item.route} onClick={onClick} className="block no-underline">
    <div
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150"
      style={{
        margin: depth === 0 ? "0" : "0",
        paddingLeft: depth === 1 ? "2.25rem" : "0.75rem",
        backgroundColor: isActive ? T.activeBg : "transparent",
        color: isActive ? T.activeText : T.textDefault,
        fontWeight: isActive ? 600 : 400,
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.backgroundColor = T.hoverBg;
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {item.icon && (
        <span
          className="shrink-0 flex items-center justify-center w-4 h-4"
          style={{ color: isActive ? T.activeText : T.textMuted }}
        >
          {item.icon}
        </span>
      )}
      <span className="text-sm flex-1 truncate">{item.label}</span>
      {isActive && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: T.activeDot }}
        />
      )}
    </div>
  </Link>
);

// ── Group nav item ───────────────────────────────────────────────────────────
const NavGroup = ({ item, pathname, onNavigate }) => {
  const hasActiveChild = item.children?.some(
    (c) => pathname === c.route || pathname.startsWith(c.route + "/"),
  );
  const [open, setOpen] = useState(hasActiveChild);

  return (
    <div className="mb-0.5">
      {/* Group header — bottom radius removed when open */}
      <div
        className="flex items-center gap-2.5 px-3 py-2 cursor-pointer transition-all duration-150 select-none"
        style={{
          color: hasActiveChild ? T.activeText : T.textDefault,
          fontWeight: hasActiveChild ? 600 : 400,
        }}
        onMouseEnter={(e) => {
          if (!hasActiveChild)
            e.currentTarget.style.backgroundColor = T.hoverBg;
        }}
        onMouseLeave={(e) => {
          if (!hasActiveChild)
            e.currentTarget.style.backgroundColor = "transparent";
        }}
        onClick={() => setOpen((o) => !o)}
      >
        {item.icon && (
          <span
            className="shrink-0 flex items-center justify-center w-4 h-4"
            style={{ color: hasActiveChild ? T.activeText : T.textMuted }}
          >
            {item.icon}
          </span>
        )}
        <span
          className="text-sm flex-1 truncate"
          style={{ color: hasActiveChild ? T.activeText : T.textBright }}
        >
          {item.label}
        </span>
        <span style={{ color: T.textMuted }}>
          {open ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )}
        </span>
      </div>

      {open && (
        <div
          className="overflow-hidden relative pb-1"
          style={{
            backgroundColor: T.groupBg,
            borderRadius: "0 0 0.5rem 0.5rem",
          }}
        >
          {/* left accent line */}
          <div
            className="absolute left-5 top-1 bottom-1 w-px rounded-full"
            style={{ backgroundColor: T.border }}
          />
          {item.children.map((child) => (
            <NavItem
              key={child.route}
              item={child}
              isActive={
                pathname === child.route ||
                pathname.startsWith(child.route + "/")
              }
              onClick={onNavigate}
              depth={1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ── Nav list ─────────────────────────────────────────────────────────────────
const NavList = ({ navigations, pathname, onNavigate }) => (
  <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
    {navigations
      .filter((n) => n.isShow)
      .map((item) =>
        item.children?.length ? (
          <NavGroup
            key={item.key || item.route}
            item={item}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ) : (
          <NavItem
            key={item.route}
            item={item}
            isActive={
              pathname === item.route || pathname.startsWith(item.route + "/")
            }
            onClick={onNavigate}
          />
        ),
      )}
  </nav>
);

// ── Bottom actions ────────────────────────────────────────────────────────────
const BottomActions = ({ basePath, onNavigate, onLogout }) => {
  const { modal } = App.useApp();
  const location = useLocation();
  const isSettings = location.pathname.includes("account-settings");

  const confirmLogout = () =>
    modal.confirm({
      title: "Logout",
      content: "Do you want to logout?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: { danger: true },
      onOk: onLogout,
    });

  return (
    <div
      className="shrink-0 border-t pt-2 pb-3 px-2 space-y-0.5"
      style={{ borderColor: T.border }}
    >
      <Link
        to={`${basePath}/account-settings`}
        onClick={onNavigate}
        className="block no-underline"
      >
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150"
          style={{
            backgroundColor: isSettings ? T.activeBg : "transparent",
            color: isSettings ? T.activeText : T.textDefault,
          }}
          onMouseEnter={(e) => {
            if (!isSettings) e.currentTarget.style.backgroundColor = T.hoverBg;
          }}
          onMouseLeave={(e) => {
            if (!isSettings)
              e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <SettingOutlined
            className="w-4 h-4 shrink-0"
            style={{ color: isSettings ? T.activeText : T.textMuted }}
          />
          <span className="text-sm">Account Settings</span>
        </div>
      </Link>

      <div
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150"
        style={{ color: T.logoutText }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = T.logoutHover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
        onClick={confirmLogout}
      >
        <LoginOutlined className="w-4 h-4 shrink-0" />
        <span className="text-sm">Logout</span>
      </div>
    </div>
  );
};

// ── Sidebar shell ─────────────────────────────────────────────────────────────
const SidebarShell = ({
  navigations,
  pathname,
  basePath,
  onNavigate,
  onLogout,
  logoMaxWidth = 120,
  organizationLogo,
}) => (
  <div
    className="flex flex-col h-full"
    style={{ backgroundColor: T.bg, borderRight: `1px solid ${T.border}` }}
  >
    {/* Logo */}
    <div
      className="shrink-0 flex items-center justify-center px-4 py-4 border-b h-32 mb-2"
      style={{ borderColor: T.border }}
    >
      <img
        src={organizationLogo || logo}
        alt="Logo"
        style={{
          maxWidth: logoMaxWidth,
          maxHeight: 80,
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>

    {/* Nav */}
    <NavList
      navigations={navigations}
      pathname={pathname}
      onNavigate={onNavigate}
    />

    {/* User + bottom */}
    <BottomActions
      basePath={basePath}
      onNavigate={onNavigate}
      onLogout={onLogout}
    />
  </div>
);

// ── Main export ───────────────────────────────────────────────────────────────
const Sidebar = ({
  collapsed,
  handleCollapse,
  navigations,
  handleLogout,
  organization = null,
}) => {
  const { width } = useWindowSize();
  const location = useLocation();
  const pathname = location.pathname;

  const basePath = pathname.startsWith("/admin") ? "/admin" : "/superadmin";

  const close = () => handleCollapse(false);

  if (width <= 992) {
    return (
      <Drawer
        placement="left"
        onClose={close}
        open={collapsed}
        width={260}
        styles={{
          body: { padding: 0 },
          header: { display: "none" },
        }}
      >
        <SidebarShell
          navigations={navigations}
          pathname={pathname}
          basePath={basePath}
          onNavigate={close}
          onLogout={handleLogout}
          logoMaxWidth={140}
          organizationLogo={organization?.organizationLogo}
        />
      </Drawer>
    );
  }

  return (
    <div
      className="hidden md:flex flex-col h-screen fixed left-0 top-0 overflow-hidden"
      style={{
        width: collapsed ? 0 : 250,
        minWidth: collapsed ? 0 : 250,
        transition: "width 0.2s ease, min-width 0.2s ease",
        zIndex: 100,
      }}
    >
      <SidebarShell
        navigations={navigations}
        pathname={pathname}
        basePath={basePath}
        onNavigate={() => {}}
        onLogout={handleLogout}
        organizationLogo={organization?.organizationLogo}
      />
    </div>
  );
};

export default Sidebar;
