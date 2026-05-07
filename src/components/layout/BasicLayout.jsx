import { useState, useMemo } from "react";
import {
  Layout,
  Avatar,
  Button,
  Card,
  Divider,
  Popover,
  Typography,
} from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Outlet } from "react-router";
import { useWindowSize } from "../../hooks/useWindowSize";
import { usePermissions } from "../../hooks/usePermissions";
import { filterNavigationByPermissions } from "../../utils/filterNavigation";
import Sidebar from "./Sidebar";

const { Header, Content } = Layout;

const BasicLayout = ({ navigations, store }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { width } = useWindowSize();
  const { userData, reset } = store();
  const { hasPermission, isLoading } = usePermissions();

  const isMobile = width < 992;

  // Filter navigations based on user permissions
  const filteredNavigations = useMemo(() => {
    if (isLoading) return [];
    return filterNavigationByPermissions(navigations, hasPermission);
  }, [navigations, hasPermission, isLoading]);

  const handleCollapse = (value) => {
    setCollapsed(value);
  };

  const handleOpenChange = (newOpen) => {
    setUserOpen(newOpen);
  };

  return (
    <Layout className="h-screen w-screen fixed">
      <Sidebar
        collapsed={isMobile ? collapsed : collapsed}
        handleCollapse={handleCollapse}
        navigations={filteredNavigations}
        handleLogout={reset}
        userData={userData}
      />

      <Layout className="site-layout">
        <Header
          style={{ backgroundColor: "#3b82f6" }}
          className="site-layout-background flex justify-between items-center h-[55px] text-white px-3 md:pr-7"
        >
          <div className="flex h-full items-center gap-3">
            {collapsed ? (
              <MenuFoldOutlined
                className="text-2xl cursor-pointer"
                onClick={() => handleCollapse(!collapsed)}
              />
            ) : (
              <MenuUnfoldOutlined
                className="text-2xl cursor-pointer"
                onClick={() => handleCollapse(!collapsed)}
              />
            )}
          </div>

          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.5 },
            }}
            whileTap={{
              scale: 0.8,
            }}
          >
            {width <= 480 ? (
              <></>
            ) : (
              <Popover
                content={
                  <Card>
                    <div className="text-center">
                      <Avatar
                        size={60}
                        icon={<UserOutlined />}
                        className="bg-blue-500"
                      />
                      <div className="leading-none">
                        <Typography.Title level={4}>
                          {userData &&
                            [userData.firstName, userData.lastName].join(" ")}
                        </Typography.Title>
                      </div>
                      <div>
                        <Typography.Text>
                          {userData && userData.email}
                        </Typography.Text>
                      </div>
                      <Divider />
                      <Button danger onClick={reset} icon={<LogoutOutlined />}>
                        SIGN OUT
                      </Button>
                    </div>
                  </Card>
                }
                trigger="click"
                onOpenChange={handleOpenChange}
                open={userOpen}
                className="cursor-pointer"
              >
                <div className="flex justify-center items-center">
                  <div className="justify-start items-center gap-3 flex">
                    <Avatar size={40} icon={<UserOutlined />} />
                    <div className="justify-start items-start gap-2 flex">
                      <div className="text-white text-base font-normal leading-normal">
                        {userData &&
                          [userData.firstName, userData.lastName].join(" ")}
                      </div>
                    </div>
                    {userOpen ? <UpOutlined /> : <DownOutlined />}
                  </div>
                </div>
              </Popover>
            )}
          </motion.div>
        </Header>

        <Content className="bg-white h-full w-full overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
