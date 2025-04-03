import Button from "../Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "../../icons/MenuIcon";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../common/slice";
import { logout } from "../../screens/login/slice";

const Header = (props) => {
  const { title } = props;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className="min-h-[52px] h-[52px] flex justify-between items-center bg-nav-bg shadow-soft-bottom px-5 sticky top-0 left-0 z-40">
      <div>
        <h1 className="text-primary text-xl font-medium">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button theme="tertiary-primary" onClick={() => dispatch(logout())}>
          Sign out
        </Button>
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
