import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ProfileOutlined,
  NotificationOutlined,
  MessageOutlined,
  ExperimentOutlined,
  CalendarOutlined,
  DatabaseOutlined,
  PieChartOutlined,
  BookOutlined,
  CreditCardOutlined,
  CloudOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const items = [
  { key: "dashboard", icon: <AppstoreOutlined />, label: "Dashboard" },
  { key: "products", icon: <AppstoreOutlined />, label: "Products" },
  { key: "users", icon: <UserOutlined />, label: "Users" },
  { key: "teams", icon: <TeamOutlined />, label: "Teams" },
  { key: "projects", icon: <FolderOpenOutlined />, label: "Projects" },
  { key: "tasks", icon: <FileTextOutlined />, label: "Tasks" },
  { key: "analytics", icon: <BarChartOutlined />, label: "Analytics" },
  { key: "sales", icon: <ShoppingCartOutlined />, label: "Sales" },
  { key: "finance", icon: <DollarOutlined />, label: "Finance" },
  { key: "profile", icon: <ProfileOutlined />, label: "Profile" },
  { key: "notifications", icon: <NotificationOutlined />, label: "Notifications" },
  { key: "messages", icon: <MessageOutlined />, label: "Messages" },
  { key: "settings", icon: <SettingOutlined />, label: "Settings" },
  { key: "experiments", icon: <ExperimentOutlined />, label: "Experiments" },
  { key: "calendar", icon: <CalendarOutlined />, label: "Calendar" },
  { key: "database", icon: <DatabaseOutlined />, label: "Database" },
  { key: "reports", icon: <PieChartOutlined />, label: "Reports" },
  { key: "documents", icon: <BookOutlined />, label: "Documents" },
  { key: "billing", icon: <CreditCardOutlined />, label: "Billing" },
  { key: "cloud", icon: <CloudOutlined />, label: "Cloud" },
];

const Aside = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate(`/${e.key}`);
  };

  return (
    <Menu
      style={{ padding: "8px 0" }}
      onClick={onClick}
      className="w-full h-full overflow-auto hide-scrollbar"
      defaultSelectedKeys={["dashboard"]}
      mode="inline"
      items={items.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: <span className="font-semibold">{item.label}</span>,
      }))}
    />
  );
};

export default Aside;
