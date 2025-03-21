import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { title } = props;
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-[52px] flex justify-between items-center bg-nav-bg px-2">
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <Button onClick={onClick} type="primary">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Header;
