import Button from "../Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "../../icons/MenuIcon";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../commonSlice";

const Header = (props) => {
  const { title } = props;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-[52px] h-[52px] flex justify-between items-center bg-nav-bg shadow-soft-bottom px-5 sticky top-0 left-0 z-40">
      <div>
        <h1 className="text-primary text-xl font-medium">{title}</h1>
      </div>
      <div>
        <Button
          className="flex 2xl:hidden"
          onClick={() => dispatch(toggleMenu())}
          theme="primary"
          shape="circle"
          icon={<MenuIcon className="w-6 h-6" />}
        />
      </div>
    </div>
  );
};

export default Header;
