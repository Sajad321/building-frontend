import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import printJS from "print-js";
import ConfirmModal from "../../common/ConfirmModal";
const apiUrl = process.env.API_URL;

// var { ipcRenderer } = require("electron");

function Expenses({ edit, sideBarShow }) {
  const [data, setData] = useState({ expenses: [], searchedExpenses: [] });
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });

  const getExpenses = async () => {
    try {
      const response = await fetch(`${apiUrl}/expenses`, {
        method: "GET",
        headers: {
          Authorization: `Bearer`,
        },
      });

      const responseData = await response.json();
      setData({
        ...data,
        expenses: responseData.expenses,
        searchedExpenses: responseData.expenses,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch2Change = (e) => {
    setSearch2(e.target.value);
  };

  const handleSearchButton = (e) => {
    e.preventDefault();
    const reg = new RegExp(search, "i");
    if (searchType == "1") {
      setData({
        ...data,
        searchedExpenses: [...data.expenses].filter((d) => d.name.match(reg)),
      });
    } else if (searchType == "2") {
      setData({
        ...data,
        searchedExpenses: [...data.expenses].filter(
          (d) => d.date <= search2 && d.date >= search
        ),
      });
    }
  };
  const handleDeleteButton = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/expenses/${id}`, {
        method: "DELETE",
      });
      const responseData = await response.json();

      toast.success("تم حذف الصرفيات");
      getExpenses();
    } catch (error) {
      console.log(error.message);
      toast.error("فشل الحذف");
    }
  };

  const printTable = () => {
    printJS({
      printable: "print-table",
      type: "html",
    });
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
            id="searchStudent"
            onChange={handleSearchChange}
            placeholder="ابحث"
          ></input>
        </div>
      );
    } else if (searchType == "2") {
      return (
        <Fragment>
          <div className="col-5 offset-2 col-md-3 offset-md-0 order-0 order-md-2">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearchChange}
            ></input>
          </div>
          <p
            className="col-2 col-md-1 order-1 order-md-3 text-white"
            style={{ fontSize: "20px" }}
          >
            من
          </p>
          <div className="col-5 offset-5 col-md-3 offset-md-0 order-2 order-md-0">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch2Change}
            ></input>
          </div>
          <p
            className="col-2 col-md-1 order-3 order-md-1 text-white"
            style={{ fontSize: "20px" }}
          >
            الى
          </p>
        </Fragment>
      );
    }
  };

  const render_table = () => {
    if (searchType != "0") {
      const render_data = data.searchedExpenses.map((expense, index) => {
        return (
          <tr key={expense.id} className="font-weight-bold text-white">
            <td className="t-id">{index + 1}</td>
            <td className="t-name">{expense.name}</td>
            <td className="">{expense.type}</td>
            <td className="">{expense.amount}</td>
            <td className="">{expense.date}</td>
            <td className="">
              <button
                className="btn btn-secondary"
                onClick={() => edit(expense)}
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
                    id: expense.id,
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
              <th className="">نوع الصرف</th>
              <th className="">المبلغ</th>
              <th className="">التاريخ</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>{render_data}</tbody>
        </table>
      );
    } else if (searchType == "0") {
      const render_data = data.expenses.map((expense, index) => {
        return (
          <tr key={expense.id} className="font-weight-bold text-white">
            <td className="t-id">{index + 1}</td>
            <td className="t-name">{expense.name}</td>
            <td className="">{expense.type}</td>
            <td className="">{expense.amount}</td>
            <td className="">{expense.date}</td>
            <td className="">
              <button
                className="btn btn-secondary"
                onClick={() => edit(expense)}
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
                    id: expense.id,
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
              <th className="">نوع الصرف</th>
              <th className="">المبلغ</th>
              <th className="">التاريخ</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>{render_data}</tbody>
        </table>
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
                          <option value="2">التاريخ</option>
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
                <div className="col-3">
                  <h2 className="text text-white">الصرفيات</h2>
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

export default Expenses;
