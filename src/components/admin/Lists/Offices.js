import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import printJS from "print-js";
import ConfirmModal from "../../common/ConfirmModal";
const apiUrl = process.env.API_URL;
var dialog = require("electron").remote.dialog;

function Offices({ edit, page, sideBarShow, handleOfficeDetails, setOffice }) {
  const [offices, setOffices] = useState([]);
  const [searchedOffices, setSearchedOffices] = useState([]);
  const [search, setSearch] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });
  const getOffices = async () => {
    try {
      const response = await fetch(`${apiUrl}/offices`, {
        method: "GET",
        headers: {
          Authorization: `Bearer`,
        },
      });

      const responseData = await response.json();
      setOffices(responseData.offices);
      setSearchedOffices(responseData.offices);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOffices();
  }, []);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchButton = (e) => {
    e.preventDefault();
    let reg = new RegExp(search, "i");
    setSearchedOffices([...offices].filter((d) => d.name.match(reg)));
  };

  const handleDeleteButton = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/offices?office_id=${id}`, {
        method: "DELETE",
      });
      const responseData = await response.json();

      toast.success("تم حذف المكتب");
      getOffices();
    } catch (error) {
      console.log(error.message);
      toast.error("فشل الحذف");
    }
  };

  return (
    <section className="main">
      <ConfirmModal
        show={confirmModal.show}
        onHide={() =>
          setConfirmModal({
            ...confirmModal,
            show: false,
            id: "",
          })
        }
        confirm={handleDeleteButton}
        id={confirmModal.id}
      />
      <div className="row pt-5 m-0">
        <div
          className={
            sideBarShow
              ? "width-others-wide mr-auto main-view"
              : "width-others-narrow mr-auto main-view"
          }
          id="main-view"
        >
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5" dir="rtl">
            <div className="col-12" dir="ltr">
              <div className="row mt-3">
                <div className="col-8">
                  <form onSubmit={handleSearchButton}>
                    <div className="form-group row mt-1">
                      <div className="col-2 text">
                        <button
                          type="submit"
                          className="btn btn-secondary btn-sm mt-1"
                        >
                          ابحث
                        </button>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control text"
                          id="searchStudent"
                          onChange={handleSearchChange}
                          placeholder="ابحث"
                        ></input>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-4">
                  <h2 className="text text-white">المكاتب</h2>
                </div>
              </div>
            </div>
            {search != ""
              ? searchedOffices.map((office) => {
                  return (
                    <div className="col-sm-3 p-4" dir="ltr" key={office.id}>
                      <div
                        className="card card-common card-height"
                        onClick={() => {
                          handleOfficeDetails();
                          setOffice(office);
                        }}
                      >
                        <div className="card-body">
                          <div className="row">
                            <div className="col-10 col-sm-9 text-right text-white">
                              <h5>{office.name}</h5>
                              <h6>{office.renter}</h6>
                            </div>
                            <div className="col-2 col-sm-3 p-0 text-center text-white">
                              <FontAwesomeIcon icon="users" size="3x" />
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                edit(office);
                              }}
                              className="btn btn-secondary text-white"
                            >
                              تعديل
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmModal({
                                  ...confirmModal,
                                  show: true,
                                  id: office.id,
                                });
                              }}
                              className="btn btn-danger text-white ml-2"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : offices.map((office) => {
                  return (
                    <div className="col-sm-3 p-4" dir="ltr" key={office.id}>
                      <div
                        className="card card-common card-height"
                        onClick={() => {
                          handleOfficeDetails();
                          setOffice(office);
                        }}
                      >
                        <div className="card-body">
                          <div className="row">
                            <div className="col-10 col-sm-9 text-right text-white">
                              <h5>{office.name}</h5>
                              <h6>{office.renter}</h6>
                            </div>
                            <div className="col-2 col-sm-3 p-0 text-center text-white">
                              <FontAwesomeIcon icon="users" size="3x" />
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                edit(office);
                              }}
                              className="btn btn-secondary text-white"
                            >
                              تعديل
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmModal({
                                  ...confirmModal,
                                  show: true,
                                  id: office.id,
                                });
                              }}
                              className="btn btn-danger text-white ml-2"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Offices;
