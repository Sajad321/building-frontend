import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import printJS from "print-js";
const apiUrl = process.env.API_URL;
var dialog = require("electron").remote.dialog;

function Offices({ edit, page, sideBarShow, handleOfficeDetails, setOffice }) {
  const [offices, setOffices] = useState([]);

  useEffect(() => {
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
      } catch (error) {
        console.log(error.message);
      }
    };
    getOffices();
  }, []);
  return (
    <section className="main">
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
                <div className="col-12">
                  <h2 className="text text-white">المكاتب</h2>
                </div>
              </div>
            </div>

            {offices.map((office) => {
              return (
                <div className="col-sm-3 p-2" dir="ltr" key={office.id}>
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
                        </div>
                        <div className="col-2 col-sm-3 p-0 text-center text-white">
                          <FontAwesomeIcon icon="users" size="3x" />
                        </div>
                        <button
                          onClick={() => handleEditButton(office)}
                          className="btn btn-secondary text-white"
                        >
                          تعديل
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
