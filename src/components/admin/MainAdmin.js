import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const apiUrl = process.env.API_URL;

function MainAdmin({ sideBarShow }) {
  const [data, setData] = useState({
    offices_number: "",
    total_expenses: "",
    yearly_expenses: "",
    total_income: "",
    yearly_income: "",
    total_amount: "",
    yearly_amount: "",
  });
  useEffect(() => {
    const getMain = async () => {
      try {
        const response = await fetch(`${apiUrl}/main-admin`, {
          method: "GET",
          headers: {
            Authorization: `Bearer`,
          },
        });

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMain();
  }, []);
  return (
    <section className="main">
      <div className="row pt-5 m-0" dir="rtl">
        <div
          className={
            sideBarShow
              ? "width-others-wide mr-auto main-view mb-2"
              : "width-others-narrow mr-auto main-view mb-2"
          }
          id="main-view"
        >
          <div className="row pt-md-2 pr-2 pl-2 mt-3 mb-5">
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body" dir="ltr">
                  <div className="d-flex justify-content-between">
                    <FontAwesomeIcon
                      icon="house-user"
                      color="white"
                      size="3x"
                    />
                    <div className="text-right text-white">
                      <h5>عدد المكاتب</h5>
                      <h3>{data.offices_number}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-white">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body" dir="ltr">
                  <div className="d-flex justify-content-between">
                    <FontAwesomeIcon
                      icon="house-user"
                      color="white"
                      size="3x"
                    />
                    <div className="text-right text-white">
                      <h5>المبلغ الكلي</h5>
                      <h3>{data.total_amount}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-white">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body" dir="ltr">
                  <div className="d-flex justify-content-between">
                    <FontAwesomeIcon
                      icon="house-user"
                      color="white"
                      size="3x"
                    />
                    <div className="text-right text-white">
                      <h5>المبلغ السنوي</h5>
                      <h3>{data.yearly_amount}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-white">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body" dir="ltr">
                  <div className="d-flex justify-content-between">
                    <FontAwesomeIcon icon="users" color="white" size="3x" />
                    <div className="text-right text-white">
                      <h5>الصرفيات الكلي</h5>
                      <h3>{data.total_expenses}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-white">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body" dir="ltr">
                  <div className="d-flex justify-content-between">
                    <FontAwesomeIcon
                      icon="house-user"
                      color="white"
                      size="3x"
                    />
                    <div className="text-right text-white">
                      <h5>الصرفيات السنوي</h5>
                      <h3>{data.yearly_expenses}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-white">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body" dir="ltr">
                  <div className="d-flex justify-content-between">
                    <FontAwesomeIcon
                      icon="house-user"
                      color="white"
                      size="3x"
                    />
                    <div className="text-right text-white">
                      <h5>الربح الكلي</h5>
                      <h3>{data.total_income}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-white">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body" dir="ltr">
                  <div className="d-flex justify-content-between">
                    <FontAwesomeIcon
                      icon="house-user"
                      color="white"
                      size="3x"
                    />
                    <div className="text-right text-white">
                      <h5>الربح السنوي</h5>
                      <h3>{data.yearly_income}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-white">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainAdmin;
