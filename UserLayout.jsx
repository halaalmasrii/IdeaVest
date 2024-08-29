import React from "react";
import { Flex, Layout } from "antd";
import UserNavbar from "./Navbar/Navbar";

const { Content } = Layout;

function UserLayout({ children }) {
  return (
    <Flex>
      <Layout>
        <UserNavbar />
        <Content>{children}</Content>
      </Layout>
    </Flex>
  );
}

export default UserLayout;