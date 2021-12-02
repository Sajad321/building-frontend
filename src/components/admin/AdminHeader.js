import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddModal, StudentsModal } from "../common/Modal";
import SettingsModal from "./SettingsModal";

function AdminHeader(props) {
  const [addModalShow, setAddModalShow] = useState(false);
  const [settingsModalShow, setSettingsModalShow] = useState(false);
  return (
    <nav className="navbar navbar-dark navbar-expand-md">
      <AddModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        AddOfficeButton={props.handleAddOfficeButton}
        AddReceiptButton={props.handleAddReceiptButton}
      />
      {/* <SettingsModal
        show={settingsModalShow}
        onHide={() => setSettingsModalShow(false)}
        logoutWithRedirect={props.logoutWithRedirect}
      /> */}
      <div className="row">
        <div
          className="width-others-wide fixed-top mr-auto admin-nav-bg top-navbar top-height logo"
          id="top-bar"
        >
          <div className="row justify-content-center">
            <div className="col-auto">
              <NavLink to="/" className="logo-text">
                نظام ادارة بناية
              </NavLink>
            </div>
          </div>
        </div>
        <div
          className="width-sidebar-wide sidebar rightfixed p-0"
          id="side-bar"
        >
          <div className="r-navbar" id="nav-bar" dir="rtl">
            <nav className="nav">
              <div>
                {" "}
                <a
                  href="#"
                  className="nav_logo"
                  onClick={() => {
                    props.sideEvent();
                    props.setSideBarShow(!props.sideBarShow);
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    icon="bars"
                    className="nav_logo-icon"
                    color="white"
                    size="2x"
                  />
                  <span className="nav_logo-name" id="nav-text">
                    القائمة
                  </span>{" "}
                </a>
                <div className="nav_list">
                  {" "}
                  <a
                    href="#"
                    className={"nav_link " + props.Active.Main}
                    onClick={props.MainButton}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon="home"
                      className={"nav_logo-icon " + props.Active.Main}
                      color="white"
                      size="2x"
                    />
                    <span
                      className={"nav_name " + props.Active.Main}
                      id="nav-text"
                    >
                      الرئيسية
                    </span>{" "}
                  </a>{" "}
                  <a
                    href="#"
                    className={"nav_link " + props.Active.Institutes}
                    onClick={props.handleOfficesButton}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon="school"
                      className={"nav_logo-icon " + props.Active.Institutes}
                      color="white"
                      size="2x"
                    />
                    <span
                      className={"nav_name " + props.Active.Institutes}
                      id="nav-text"
                    >
                      المكاتب
                    </span>{" "}
                  </a>{" "}
                  <a
                    href="#"
                    className={"nav_link " + props.Active.Institutes}
                    onClick={props.handleExpensesButton}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon="file-invoice-dollar"
                      className={"nav_logo-icon " + props.Active.Institutes}
                      color="white"
                      size="2x"
                    />
                    <span
                      className={"nav_name " + props.Active.Institutes}
                      id="nav-text"
                    >
                      الصرفيات
                    </span>{" "}
                  </a>{" "}
                  <a
                    href="#"
                    className={"nav_link " + props.Active.Add}
                    onClick={() => setAddModalShow(true)}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon="plus-circle"
                      className={"nav_logo-icon " + props.Active.Add}
                      color="white"
                      size="2x"
                    />
                    <span
                      className={"nav_name " + props.Active.Add}
                      id="nav-text"
                    >
                      اضافة
                    </span>{" "}
                  </a>{" "}
                </div>
              </div>{" "}
              <a
                href="#"
                className="nav_link_bottom"
                onClick={() => setSettingsModalShow(true)}
              >
                {" "}
                <FontAwesomeIcon
                  icon="cog"
                  className="nav_logo-icon"
                  color="white"
                  size="2x"
                />
                <span className="nav_name" id="nav-text">
                  الاعدادات
                </span>{" "}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;
