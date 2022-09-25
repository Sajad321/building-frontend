import React, { Fragment, useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import MainAdmin from "./MainAdmin";
import Offices from "./Lists/Offices";
import OfficeDetails from "./Lists/OfficeDetails";
import Expenses from "./Lists/Expenses";
import AddOffice from "./Forms/AddOffice";
import AddReceipt from "./Forms/AddReceipt";
import AddOfficeDetails from "./Forms/AddOfficeDetails";
import Notifications from "./Notifications";
import Details from "./Lists/Details";
const apiUrl = process.env.API_URL;

function Admin(props) {
  const [page, setPage] = useState("Main");
  const [office, setOffice] = useState(0);

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
        handleNotificationsButton={handleNotificationsButton}
        handleOfficesButton={handleOfficesButton}
        handleExpensesButton={handleExpensesButton}
        handleDetailsButton={handleDetailsButton}
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
  };

  const handleNotificationsButton = () => {
    setPage("Notifications");
    setDataToChange({});
  };

  const handleOfficesButton = () => {
    setPage("Offices");
    setDataToChange({});
  };

  const handleOfficeDetails = () => {
    setPage("OfficeDetails");
    setDataToChange({});
  };

  const handleExpensesButton = () => {
    setPage("Expenses");
    setDataToChange({});
  };

  const handleDetailsButton = () => {
    setPage("Details");
    setDataToChange({});
  };

  const handleAddOfficeButton = () => {
    setPage("AddOffice");
    setDataToChange({});
  };

  const handleAddOfficeDetailsButton = () => {
    setPage("AddOfficeDetails");
    setDataToChange({});
  };

  const handleAddReceiptButton = () => {
    setPage("AddReceipt");
    setDataToChange({});
  };

  const handleEditOfficeButton = (office) => {
    setDataToChange(office);
    setPage("AddOffice");
  };

  const handleEditOfficeDetailsButton = (office_details) => {
    setDataToChange(office_details);
    setPage("AddOfficeDetails");
  };

  const handleEditReceiptButton = (receipt) => {
    setDataToChange(receipt);
    setPage("AddReceipt");
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
  } else if (page == "Notifications") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Notifications: "active" })}
        {/* End of Navbar */}
        {/* Offices */}
        <Notifications sideBarShow={sideBarShow} />
        <AdminFooter sideBarShow={sideBarShow} />
      </Fragment>
    );
  } else if (page == "Offices") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Offices: "active" })}
        {/* End of Navbar */}
        {/* Offices */}
        <Offices
          handleOfficeDetails={handleOfficeDetails}
          edit={handleEditOfficeButton}
          page={handleMainButton}
          sideBarShow={sideBarShow}
          setOffice={setOffice}
        />
        <AdminFooter sideBarShow={sideBarShow} />
      </Fragment>
    );
  } else if (page == "OfficeDetails") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Offices: "active" })}
        {/* End of Navbar */}
        {/* Offices */}
        <OfficeDetails
          edit={handleEditOfficeDetailsButton}
          addDetails={handleAddOfficeDetailsButton}
          sideBarShow={sideBarShow}
          office={office}
          setOffice={setOffice}
        />
        <AdminFooter sideBarShow={sideBarShow} />
      </Fragment>
    );
  } else if (page == "Expenses") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Expenses: "active" })}
        {/* End of Navbar */}
        {/* Expenses */}
        <Expenses edit={handleEditReceiptButton} sideBarShow={sideBarShow} />
        <AdminFooter sideBarShow={sideBarShow} />
      </Fragment>
    );
  } else if (page == "Details") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Details: "active" })}
        {/* End of Navbar */}
        {/* Expenses */}
        <Details sideBarShow={sideBarShow} />
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
  } else if (page == "AddOfficeDetails") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Add: "active" })}
        {/* End of Navbar */}
        {/* AddOfficeDetails */}
        <AddOfficeDetails
          page={handleOfficeDetails}
          dataToChange={dataToChange}
          sideBarShow={sideBarShow}
          office={office}
        />
        <AdminFooter sideBarShow={sideBarShow} />
      </Fragment>
    );
  }
}

export default Admin;
