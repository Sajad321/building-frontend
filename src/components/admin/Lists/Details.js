import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import printJS from "print-js";
import ConfirmModal from "../../common/ConfirmModal";
const apiUrl = process.env.API_URL;

function Details({ edit, addDetails, sideBarShow, office }) {
  const [data, setData] = useState({
    details: [],
    searchedDetails: [],
  });
  const [expensesData, setExpensesData] = useState({
    expenses: [],
    searchedExpenses: [],
  });
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [total, setTotal] = useState("");
  const [totalExpenses, setTotalExpenses] = useState("");
  const [totalIncome, setTotalIncome] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });

  const getDetails = async () => {
    try {
      const response = await fetch(`${apiUrl}/details`, {
        method: "GET",
        headers: {
          Authorization: `Bearer`,
        },
      });

      const responseData = await response.json();
      let x = 0;
      setData({
        ...data,
        details: responseData.details,
        searchedDetails: responseData.details,
      });
      responseData.details.map((d) => (x += d.amount));
      setTotal(x);
      const getExpenses = async () => {
        try {
          const response = await fetch(`${apiUrl}/expenses`, {
            method: "GET",
            headers: {
              Authorization: `Bearer`,
            },
          });

          const responseData = await response.json();
          let xx = 0;
          setExpensesData({
            ...expensesData,
            expenses: responseData.expenses,
            searchedExpenses: responseData.expenses,
          });
          responseData.expenses.map((d) => (xx += d.amount));
          setTotalExpenses(xx);
          setTotalIncome(x - xx);
        } catch (error) {
          console.log(error.message);
        }
      };
      getExpenses();
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getDetails();
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
    let x = 0;
    let xx = 0;
    if (searchType == "1") {
      data.details
        .filter((d) => d.office__name.match(reg))
        .map((d) => (x += d.amount));
      setData({
        ...data,
        searchedDetails: [...data.details].filter((d) =>
          d.office__name.match(reg)
        ),
      });
      setTotal(x);
    } else if (searchType == "2") {
      data.details
        .filter((d) => d.renter.match(reg))
        .map((d) => (x += d.amount));
      setData({
        ...data,
        searchedDetails: [...data.details].filter((d) => d.renter.match(reg)),
      });
      setTotal(x);
    } else if (searchType == "3") {
      data.details
        .filter(
          (d) => d.date_of_receipt <= search2 && d.date_of_receipt >= search
        )
        .map((d) => (x += d.amount));
      expensesData.expenses
        .filter((d) => d.date <= search2 && d.date >= search)
        .map((d) => (xx += d.amount));
      setData({
        ...data,
        searchedDetails: [...data.details].filter(
          (d) => d.date_of_receipt <= search2 && d.date_of_receipt >= search
        ),
      });
      setTotal(x);
      setTotalExpenses(xx);
      setTotalIncome(x - xx);
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
      const response = await fetch(`${apiUrl}/office-details/${id}`, {
        method: "DELETE",
      });
      const responseData = await response.json();
      console.log(responseData);
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
            <td className="t-name">{detail.office__name}</td>
            <td className="t-name">{detail.renter}</td>
            <td className="">{detail.date_of_receipt}</td>
            <td className="">{detail.date_of_claiming}</td>
            <td className="">{detail.amount}</td>
            <td className="">{detail.notes}</td>
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
              <th className="t-name">المكتب</th>
              <th className="t-name">المؤجر</th>
              <th className="">تاريخ الاستلام</th>
              <th className="">تاريخ الاستحقاق</th>
              <th className="">المبلغ</th>
              <th className="">الملاحظات</th>
            </tr>
          </thead>
          <tbody>
            {render_data}
            <tr>
              <td>المجموع الكلي</td>
              <td>{total}</td>
              <td>الربح الكلي</td>
              <td>{totalIncome}</td>
              <td>الصرفيات الكلي</td>
              <td>{totalExpenses}</td>
            </tr>
          </tbody>
        </table>
      );
    } else if (searchType == "0") {
      const render_data = data.details.map((detail, index) => {
        return (
          <tr key={detail.id} className="font-weight-bold text-white">
            <td className="t-id">{index + 1}</td>
            <td className="t-name">{detail.office__name}</td>
            <td className="t-name">{detail.renter}</td>
            <td className="">{detail.date_of_receipt}</td>
            <td className="">{detail.date_of_claiming}</td>
            <td className="">{detail.amount}</td>
            <td className="">{detail.notes}</td>
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
              <th className="t-name">المكتب</th>
              <th className="t-name">المؤجر</th>
              <th className="">تاريخ الاستلام</th>
              <th className="">تاريخ الاستحقاق</th>
              <th className="">المبلغ</th>
              <th className="">الملاحظات</th>
            </tr>
          </thead>
          <tbody>
            {render_data}
            <tr>
              <td>المجموع الكلي</td>
              <td>{total}</td>
              <td>الربح الكلي</td>
              <td>{totalIncome}</td>
              <td>الصرفيات الكلي</td>
              <td>{totalExpenses}</td>
            </tr>
          </tbody>
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
    } else if (searchType == "2") {
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
    } else if (searchType == "3") {
      return (
        <>
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
        </>
      );
    }
  };
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
                          <option value="1">المكتب</option>
                          <option value="2">المؤجر</option>
                          <option value="3">تاريخ الاستلام</option>
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
                  <h2 className="text text-white">المجموع الكلي: {total}</h2>
                </div>
                <div className="col-1">
                  <h2 className="text text-white">الايجارات</h2>
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

export default Details;
