import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../img/logo.svg";

function Header({ user, location, transparent }) {
  const path = location.pathname;
  const isAuthPage = () => {
    if (path === "/register" || path === "/login") {
      return false;
    }

    return true;
  };

  const parentClass = () => {
    const pathname = location.pathname.split('/');
    if (pathname[1] === "board") {
      return "horizontal-menu transparent";
    }
    return "horizontal-menu";
  };

  return (
    <>
      {isAuthPage() ? (
        <div className={parentClass()}>
          <nav className="navbar col-lg-12 col-12 p-0 fixed-top top-navbar">
            <div className="container">
              <div className="text-left navbar-brand-wrapper d-flex align-items-center justify-content-between">
                <Link className="navbar-brand brand-logo" to="/">
                  <img src={logo} alt="logo" />
                </Link>

                <button
                  className="navbar-toggler align-self-center"
                  type="button"
                  data-toggle="minimize"
                >
                  <span className="mdi mdi-menu"></span>
                </button>
              </div>
              <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <ul className="navbar-nav navbar-nav-right">
                  <li className="nav-item nav-user-icon">
                    <Link className="nav-link" to="/profile">
                      <img src="https://via.placeholder.com/37x37" alt="" />
                    </Link>
                  </li>
                  <li className="nav-item nav-settings d-none d-lg-flex">
                    <button className="nav-link" href="#">
                      <i className="mdi mdi-dots-horizontal"></i>
                    </button>
                  </li>
                </ul>
                <button
                  className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                  type="button"
                  data-toggle="offcanvas"
                >
                  <span className="mdi mdi-menu"></span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}

export default withRouter(Header);
