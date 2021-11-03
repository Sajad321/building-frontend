import React, { Fragment, useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import MainAdmin from "./MainAdmin";
import Offices from "./Lists/Offices";
import Expenses from "./Lists/Expenses";
import AddOffice from "./Forms/AddOffice";
import AddReceipt from "./Forms/AddReceipt";
const apiUrl = process.env.API_URL;

function Admin(props) {
  const [page, setPage] = useState("Main");

  const [sideBarShow, setSideBarShow] = useState(true);

  const sideEvent = () => {
    let nav = document.querySelectorAll("#nav-text");
    let sideBar = document.getElementById("side-bar");
    let topBar = document.getElementById("top-bar");
    let bottomBar = document.getElementById("bottom-bar");
    let mainView = document.getElementById("main-view");
    if (!sideBarShow) {
      // console.log("showed");
      for (let i = 0; i < nav.length; i++) {
        nav[i].style.display = "block";
      }
      sideBar.className = "width-sidebar-wide sidebar rightfixed p-0";
      topBar.className =
        "width-others-wide fixed-top mr-auto admin-nav-bg top-navbar top-height logo";
      bottomBar.className =
        "width-others-wide fixed-bottom mr-auto admin-nav-bg bottom-bar";
      mainView.className = "width-others-wide mr-auto main-view";
    } else {
      // console.log("cut");
      for (let i = 0; i < nav.length; i++) {
        nav[i].style.display = "none";
      }
      sideBar.className = "width-sidebar-narrow sidebar rightfixed p-0";
      topBar.className =
        "width-others-narrow fixed-top mr-auto admin-nav-bg top-navbar top-height logo";
      bottomBar.className =
        "width-others-narrow fixed-bottom mr-auto admin-nav-bg bottom-bar";
      mainView.className = "width-others-narrow mr-auto main-view";
    }
  };
  const [dataToChange, setDataToChange] = useState({});

  const AdminHeaderFunction = (Act) => {
    return (
      <AdminHeader
        logoutWithRedirect={props.logoutWithRedirect}
        Active={Act}
        MainButton={handleMainButton}
        handleOfficesButton={handleOfficesButton}
        handleExpensesButton={handleExpensesButton}
        handleAddOfficeButton={handleAddOfficeButton}
        handleAddReceiptButton={handleAddReceiptButton}
        sideEvent={sideEvent}
        sideBarShow={sideBarShow}
        setSideBarShow={setSideBarShow}
      />
    );
  };

  const handleMainButton = () => {
    setPage("Main");
    setDataToChange({});
    getInstallments();
    getAttendance();
  };

  const handleOfficesButton = () => {
    setPage("Offices");
    setDataToChange({});
  };

  const handleExpensesButton = () => {
    setPage("Expenses");
    setDataToChange({});
  };

  const handleAddOfficeButton = () => {
    setPage("AddOffice");
    setDataToChange({});
  };

  const handleAddReceiptButton = () => {
    setPage("AddReceipt");
    setDataToChange({});
  };

  const handleEditStudentButton = (student) => {
    setDataToChange(student);
    setPage("AddStudent");
  };

  const handleEditInstallmentButton = (installment) => {
    setDataToChange(installment);
    setPage("AddInstallment");
  };

  if (page == "Main") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Main: "active" })}
        {/* End of Navbar */}

        {/* Main */}
        <MainAdmin sideEvent={sideEvent} sideBarShow={sideBarShow} />
        <AdminFooter sideBarShow={sideBarShow} />
      </Fragment>
    );
  } else if (page == "Offices") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Students: "active" })}
        {/* End of Navbar */}
        {/* Offices */}
        <Offices
          edit={handleEditInstallmentButton}
          page={handleMainButton}
          sideBarShow={sideBarShow}
        />
        <AdminFooter sideBarShow={sideBarShow} />
      </Fragment>
    );
  } else if (page == "Expenses") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Students: "active" })}
        {/* End of Navbar */}
        {/* Expenses */}
        <Expenses sideBarShow={sideBarShow} />
        <AdminFooter sideBarShow={sideBarShow} />
      </Fragment>
    );
  } else if (page == "AddReceipt") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Add: "active" })}
        {/* End of Navbar */}
        {/* AddReceipt */}
        <AddReceipt
          page={handleMainButton}
          dataToChange={dataToChange}
          sideBarShow={sideBarShow}
        />
        <AdminFooter sideBarShow={sideBarShow} />
      </Fragment>
    );
  } else if (page == "AddOffice") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Add: "active" })}
        {/* End of Navbar */}
        {/* AddOffice */}
        <AddOffice
          page={handleMainButton}
          dataToChange={dataToChange}
          sideBarShow={sideBarShow}
        />
        <AdminFooter sideBarShow={sideBarShow} />
      </Fragment>
    );
  }
}

export default Admin;
