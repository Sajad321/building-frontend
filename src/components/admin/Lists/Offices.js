import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import printJS from "print-js";
const apiUrl = process.env.API_URL;
var dialog = require("electron").remote.dialog;

function StudentsInstallments({ edit, page, sideBarShow }) {
  const [data, setData] = useState({ offices: [], searchedOffices: [] });
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");

  useEffect(() => {}, []);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    const reg = new RegExp(search, "i");
  };

  // const handleEditButton = (student) => {
  //   edit(student);
  // };

  // function PrintElem(elem) {
  //   var mywindow = window.open("", "PRINT", "height=400,width=600");

  //   mywindow.document.write(
  //     "<html><head><title>" + document.title + "</title>"
  //   );
  //   mywindow.document.write("</head><body >");
  //   mywindow.document.write("<h1>" + document.title + "</h1>");
  //   mywindow.document.write(document.getElementById(elem).innerHTML);
  //   mywindow.document.write("</body></html>");

  //   mywindow.document.close(); // necessary for IE >= 10
  //   mywindow.focus(); // necessary for IE >= 10*/

  //   mywindow.print();
  //   mywindow.close();

  //   return true;
  // }
  const printTable = () => {
    // let divToPrint = document.getElementById("print-table");
    // PrintElem(divToPrint);
    // printJS({ printable: "print-table", type: "html", targetStyles: ["*"] });
    // window.print();

    printJS({
      printable: "print-table",
      type: "html",
    });
  };

  const render_table = () => {
    if (searchType != "0") {
      const render_data = data.searchedOffices.map((office, index) => {
        return (
          <tr key={office.id} className="d-flex font-weight-bold text-white">
            <td className="t-id">{index + 1}</td>
            <td className="t-name">{office.name}</td>
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
            <tr className="d-flex">
              <th className="t-id">ت</th>
              <th className="t-name">الاسم</th>
            </tr>
          </thead>
          <tbody>{render_data}</tbody>
        </table>
      );
    } else if (searchType == "0") {
      const render_data = data.offices.map((office, index) => {
        return (
          <tr key={office.id} className="d-flex font-weight-bold text-white">
            <td className="t-id">{index + 1}</td>
            <td className="t-name">{office.name}</td>
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
            <tr className="d-flex">
              <th className="t-id">ت</th>
              <th className="t-name">الاسم</th>
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
                <div className="col-3">
                  <h2 className="text text-white">المكاتب</h2>
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

export default StudentsInstallments;
