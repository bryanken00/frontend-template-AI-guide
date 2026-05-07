import { LoginOutlined } from "@ant-design/icons";
import { App, Drawer, Image, Layout, Menu } from "antd";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { logo } from "../../assets/images/logos";
import { useWindowSize } from "../../hooks/useWindowSize";
import { generateItems, getItem } from "../../utils/itemFormat";

const { Sider } = Layout;

const TopMenus = ({ path, navigations = [], handleCollapse = () => {} }) => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    navigate(key);
    handleCollapse();
  };

  return (
    <Menu
      className="flex-1"
      mode="inline"
      items={generateItems(navigations)}
      selectedKeys={[path]}
      onClick={handleMenuClick}
    />
  );
};

const Sidebar = ({
  collapsed,
  handleCollapse,
  navigations,
  handleLogout,
  userData,
}) => {
  const { modal } = App.useApp();
  const { width } = useWindowSize();
  const location = useLocation();
  const pathname = location.pathname;

  const bottomItems = [
    getItem(
      <motion.div
        variants={{
          offscreen: { y: -200, opacity: 0 },
          onscreen: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", bounce: 0.2, duration: 1 },
          },
        }}
        whileHover={{
          x: 10,
          shadow: 20,
        }}
      >
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            modal.confirm({
              title: "LOGOUT",
              content: "Do you want to logout?",
              okText: "YES",
              cancelText: "NO",
              okButtonProps: {
                danger: true,
              },
              onOk: handleLogout,
            });
          }}
        >
          Logout
        </Link>
      </motion.div>,
      "signout",
      <LoginOutlined className="h-6 w-6" />,
    ),
  ];

  return (
    <div className={width <= 992 ? "" : "h-screen"}>
      {width <= 992 ? (
        <Drawer
          placement="left"
          onClose={() => handleCollapse(false)}
          open={collapsed}
          className="h-full"
        >
          <motion.div
            variants={{
              transition: {
                staggerChildren: 0.5,
              },
            }}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ amount: 0.1 }}
            transition={{ staggerChildren: 0.04 }}
            className="flex flex-col h-full"
          >
            <center>
              <div className="logo">
                <Image
                  preview={false}
                  src={logo}
                  className="p-4"
                  style={{ maxWidth: "200px" }}
                />
              </div>
              <div className="logo p-3 flex flex-col">
                <label className="text-2xl capitalize">
                  {userData &&
                    [userData.firstName, userData.lastName].join(" ")}
                </label>
                <label className="text-sm">
                  {userData && userData.accountId}
                </label>
              </div>
            </center>
            <TopMenus
              path={pathname}
              navigations={navigations}
              handleCollapse={() => handleCollapse(false)}
            />
            <Menu
              mode="inline"
              items={bottomItems}
              defaultSelectedKeys={[pathname]}
              onClick={() => handleCollapse(false)}
            />
          </motion.div>
        </Drawer>
      ) : (
        <Sider
          className="hidden md:flex flex-col shadow h-screen overflow-hidden fixed left-0 top-0"
          breakpoint="lg"
          collapsible
          collapsed={collapsed}
          theme="light"
          onCollapse={(value) => handleCollapse(value)}
          width={250}
        >
          <div className="flex flex-col h-full overflow-hidden">
            <center className="p-2 flex-shrink-0">
              <div className="logo rounded-lg">
                <Image
                  preview={false}
                  src={logo}
                  className="p-4"
                  style={{ maxWidth: "150px" }}
                />
              </div>
            </center>
            <div className="flex-1 overflow-y-auto">
              <TopMenus path={pathname} navigations={navigations} />
            </div>
            <Menu
              mode="inline"
              items={bottomItems}
              defaultSelectedKeys={[pathname]}
              className="flex-shrink-0"
            />
          </div>
        </Sider>
      )}
    </div>
  );
};

export default Sidebar;
