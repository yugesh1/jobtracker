import React from "react";
import Wrapper from "./BigSidebar.styled";
import NavLinks from "./NavLinks";
import Logo from "../Logo";
import { useAppSelector } from "../../store";

const BigSidebar = () => {
  const { isSidebarOpen } = useAppSelector((state) => state.user);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
