import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import printJS from "print-js";
import ConfirmModal from "../../common/ConfirmModal";
const apiUrl = process.env.API_URL;

function OfficeDetails({ edit, addDetails, sideBarShow, office }) {
  const [data, setData] = useState({ details: [], searchedDetails: [] });
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });

  const getOfficeDetails = async () => {
    try {
      const response = await fetch(`${apiUrl}/offices/${office.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer`,
        },
      });

      const responseData = await response.json();
      setData({
        ...data,
        details: responseData.office_details,
        searchedDetails: responseData.office_details,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getOfficeDetails();
  }, []);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    const reg = new RegExp(search, "i");
    if (searchType == "1") {
      setData({
        ...data,
        searchedDetails: [...data.details].filter((d) => d.renter.match(reg)),
      });
    }
  };

  const printTable = () => {
    printJS({
      printable: "print-table",
      type: "html",
    });
  };
  const handleDeleteButton = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/offices/${office.id}?office_detail_id=${id}`,
        {
          method: "DELETE",
        }
      );
      const responseData = await response.json();

      toast.success("تم حذف الاضافة");
      getOfficeDetails();
    } catch (error) {
      console.log(error.message);
      toast.error("فشل الحذف");
    }
  };

  const render_table = () => {
    if (searchType != "0") {
      const render_data = data.searchedDetails.map((detail, index) => {
        return (
          <tr key={detail.id} className="font-weight-bold text-white">
            <td className="t-id">{index + 1}</td>
            <td className="t-name">{detail.renter}</td>
            <td className="">{detail.date_of_receipt}</td>
            <td className="">{detail.date_of_claiming}</td>
            <td className="">{detail.amount}</td>
            <td className="">{detail.notes}</td>
            <td>
              <button
                onClick={() => edit(detail)}
                className="btn btn-secondary text-white"
              >
                تعديل
              </button>
            </td>
            <td>
              <button
                onClick={() =>
                  setConfirmModal({
                    ...confirmModal,
                    show: true,
                    id: detail.id,
                  })
                }
                className="btn btn-danger text-white"
              >
                حذف
              </button>
            </td>
          </tr>
        );
      });
      return (
        <table
          className="table table-dark table-striped table-bordered table-hover text"
          dir="rtl"
          border="1"
        >
          <thead className="thead-dark">
            <tr className="">
              <th className="t-id">ت</th>
              <th className="t-name">الاسم</th>
              <th className="">تاريخ الاستلام</th>
              <th className="">تاريخ الاستحقاق</th>
              <th className="">المبلغ</th>
              <th className="">الملاحظات</th>
              <th className="">&nbsp;</th>
              <th className="">&nbsp;</th>
            </tr>
          </thead>
          <tbody>{render_data}</tbody>
        </table>
      );
    } else if (searchType == "0") {
      const render_data = data.details.map((detail, index) => {
        return (
          <tr key={detail.id} className="font-weight-bold text-white">
            <td className="t-id">{index + 1}</td>
            <td className="t-name">{detail.renter}</td>
            <td className="">{detail.date_of_receipt}</td>
            <td className="">{detail.date_of_claiming}</td>
            <td className="">{detail.amount}</td>
            <td className="">{detail.notes}</td>
            <td>
              <button
                onClick={() => edit(detail)}
                className="btn btn-secondary text-white"
              >
                تعديل
              </button>
            </td>
            <td>
              <button
                onClick={() =>
                  setConfirmModal({
                    ...confirmModal,
                    show: true,
                    id: detail.id,
                  })
                }
                className="btn btn-danger text-white"
              >
                حذف
              </button>
            </td>
          </tr>
        );
      });
      return (
        <table
          className="table table-dark table-striped table-bordered table-hover text"
          dir="rtl"
          border="1"
        >
          <thead className="thead-dark">
            <tr className="">
              <th className="t-id">ت</th>
              <th className="t-name">الاسم</th>
              <th className="">تاريخ الاستلام</th>
              <th className="">تاريخ الاستحقاق</th>
              <th className="">المبلغ</th>
              <th className="">الملاحظات</th>
              <th className="">&nbsp;</th>
              <th className="">&nbsp;</th>
            </tr>
          </thead>
          <tbody>{render_data}</tbody>
        </table>
      );
    }
  };
  const searchBar = () => {
    if (searchType == "0") {
      return (
        <div className="col-7">
          <p className="form-control text">بحث حسب </p>
        </div>
      );
    } else if (searchType == "1") {
      return (
        <div className="col-7">
          <input
            type="text"
            className="form-control text"
            id="searchName"
            onChange={handleSearchChange}
            placeholder="ابحث"
          ></input>
        </div>
      );
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
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5">
            <div className="col-12">
              <div className="row mt-3">
                <div className="col-7">
                  <form>
                    <div className="form-group row mt-1">
                      <div className="col-2 text">
                        <button
                          type="submit"
                          className="btn btn-secondary btn-sm mt-1"
                          onClick={handleSearchButton}
                        >
                          ابحث
                        </button>
                      </div>
                      <div className="col-3 col-sm-2">
                        <select
                          id="searchType"
                          onChange={handleSearchTypeChange}
                          className="form-control"
                          dir="rtl"
                        >
                          <option value="0" defaultValue>
                            الكل
                          </option>
                          <option value="1">الاسم</option>
                        </select>
                      </div>
                      {searchBar()}
                    </div>
                  </form>
                </div>
                <div className="col-1 pt-1">
                  <button onClick={printTable} className="btn btn-light">
                    طباعة
                  </button>
                </div>
                <div className="col-1 pt-1">
                  <button onClick={addDetails} className="btn btn-light">
                    اضافة
                  </button>
                </div>
                <div className="col-3">
                  <h2 className="text text-white">المكتب رقم {office.name}</h2>
                </div>
              </div>
            </div>
            <div className="col-12" id="print-table">
              <div className="table-responsive">{render_table()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfficeDetails;
