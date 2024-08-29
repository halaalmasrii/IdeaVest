import React from "react";
import { Flex, Layout } from "antd";
import Sidebar from "./Sidebar";
const { Sider,Content } = Layout;

const sideStyle ={
    background: "linear-gradient(135deg, #6e8efb, #a777e3)",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    
  };

  const layoutStyle = {
    background: "transparent",
    overflow: "hidden",
    width: "calc(100% )",
    maxWidth: "calc(100%)",
  };
  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "12px",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100vh",
    flex: 1,
    
  };

function LayoutDashboard({ children }) {
  return (
    <Flex gap={'middle'} wrap height='100vh'>
      <Layout style={layoutStyle}>
        <Sider style={sideStyle}>
        <Sidebar />
        </Sider>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </Flex>
  );
}

export default LayoutDashboard;