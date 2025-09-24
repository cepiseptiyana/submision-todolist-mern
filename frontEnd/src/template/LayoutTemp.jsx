import React from "react";
import { Layout, Menu, Grid } from "antd";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Outlet } from "react-router";

// Navigasi
import { useNavigate, useLocation } from "react-router";

const { Footer } = Layout;

// mapping agar desktop & mobile bisa sinkron
const keyMap = {
  list: { desktop: "ListDesktop", mobile: "ListMobile", path: "/" },
  manage: {
    desktop: "ManageDesktop",
    mobile: "ManageMobile",
    path: "/manage-category",
  },
};

// Navigasi DEKSTOP
const navigasiDekstop = [
  { label: "Todo List", key: keyMap.list.desktop },
  { label: "Manage Categories", key: keyMap.manage.desktop },
];

// Navigasi MOBILE
const { useBreakpoint } = Grid;
const navigasiMobile = [
  {
    key: "List",
    label: "Menu",
    icon: <AlignLeftOutlined />,
    children: [
      { key: keyMap.list.mobile, label: "Todo List" },
      { key: keyMap.manage.mobile, label: "Manage Categories" },
    ],
  },
];

const LayoutTemp = () => {
  // satu state global
  const [currentPage, setCurrentPage] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  // cari currentPage dari
  const getPageFromPath = (pathname) => {
    const found = Object.entries(keyMap).find(
      ([, { path }]) => path === pathname
    );

    return found ? found[0] : null; // path jika tidak ada,
  };

  React.useEffect(() => {
    setCurrentPage(getPageFromPath(location.pathname));
  }, [location.pathname]);

  const handleClick = (e) => {
    // cari key logis dari yang diklik
    const found = Object.entries(keyMap).find(
      ([, { desktop, mobile }]) => e.key === desktop || e.key === mobile
    );

    if (found) {
      const page = found[0];
      setCurrentPage(found[0]); // "list" / "manage"

      // navigasi ke path React Router
      const path = keyMap[page].path;
      navigate(path);
    }
  };

  return (
    <>
      {screens.md ? (
        <Menu
          onClick={handleClick}
          selectedKeys={currentPage ? [keyMap[currentPage].desktop] : []} // sinkron ke desktop
          mode="horizontal"
          items={navigasiDekstop}
        />
      ) : (
        <Menu
          onClick={handleClick}
          selectedKeys={currentPage ? [keyMap[currentPage].mobile] : []} // sinkron ke mobile
          defaultOpenKeys={["List"]}
          mode="inline"
          items={navigasiMobile}
        />
      )}

      <Outlet />

      <Footer style={{ textAlign: "center" }}>
        Designed with by Cepi Septiyana ©{new Date().getFullYear()}
      </Footer>
    </>
  );
};
export default LayoutTemp;
