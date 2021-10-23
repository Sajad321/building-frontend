import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import printJS from "print-js";
import ConfirmModal from "../../common/ConfirmModal";
const apiUrl = process.env.API_URL;
var dialog = require("electron").remote.dialog;

function StudentsInstallments({
  edit,
  page,
  sideBarShow,
  data,
  setData,
  searchedData,
  setSearchedData,
  institutes,
  institute,
}) {
  const [confirmModal, setConfirmModal] = useState({
    visbile: false,
    installment_received_id: 0,
    received: 0,
    index: 0,
  });
  const [searchType, setSearchType] = useState("0");
  const [searchInstitute, setSearchInstitute] = useState("0");
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearchInstitute(institute);
    if (institute != "0") {
      setSearchedData({
        students: [...data.students].filter((d) => d.institute_id == institute),
        installments: [...data.installments].filter(
          (d) => d.institute_id == institute
        ),
      });
    }
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

    if (searchInstitute != "0") {
      if (searchType == "1") {
        setSearchedData({
          students: [...data.students].filter(
            (d) => d.name.match(reg) && d.institute_id == searchInstitute
          ),
          installments: [...data.installments].filter(
            (d) => d.institute_id == searchInstitute
          ),
        });
      }
    } else {
      if (searchType == "1") {
        setSearchedData({
          students: [...data.students].filter((d) => d.name.match(reg)),
          installments: [...data.installments],
        });
      }
    }
  };

  const handleInstituteChange = (e) => {
    if (e.target.value != "0") {
      setSearchInstitute(e.target.value);
      setSearchedData({
        students: [...data.students].filter(
          (d) => d.institute_id == e.target.value
        ),
        installments: [...data.installments].filter(
          (d) => d.institute_id == e.target.value
        ),
      });
    } else {
      setSearchInstitute("0");
      setSearchedData({
        students: [...data.students],
        installments: [...data.installments],
      });
    }
  };

  // const handleEditButton = (student) => {
  //   edit(student);
  // };
  const handleReceiveInstallmentsButton = async (id) => {
    let response = await dialog.showMessageBox({
      buttons: ["لا", "نعم"],
      message: "هل انت متأكد؟",
    });
    if (response.response == 1) {
      try {
        const response = await fetch(
          `${apiUrl}/student-install-bid?installment_id=${Number(id)}`,
          {
            method: "PATCH",
          }
        );

        const responseData = await response.json();
        page();
      } catch (error) {
        console.log(error.message);
        toast.warn("حصل خطأ");
      }
    }
  };
  const handleInstallmentsToggle = (studentIndex, id, received) => {
    if ((searchType != "0") | (searchInstitute != "0")) {
      const installmentIndex = searchedData.students[
        studentIndex
      ].installment_received.findIndex((i) => i.id == id);
      let nee = [...searchedData.students];
      let nee1 = [...nee[studentIndex].installment_received];
      nee1[installmentIndex] = {
        ...nee1[installmentIndex],
        received: received,
      };
      nee[studentIndex].installment_received[installmentIndex] =
        nee1[installmentIndex];
      setSearchedData({
        ...searchedData,
        students: nee,
      });
    } else if (searchType == "0") {
      const installmentIndex = data.students[
        studentIndex
      ].installment_received.findIndex((i) => i.id == id);
      let nee = [...data.students];
      let nee1 = [...nee[studentIndex].installment_received];
      nee1[installmentIndex] = {
        ...nee1[installmentIndex],
        received: received,
      };
      nee[studentIndex].installment_received[installmentIndex] =
        nee1[installmentIndex];
      setData({
        ...data,
        students: nee,
      });
    }
  };
  const handleInstallmentsToggleButton = (index, id, received) => {
    const toggleInstallment = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/student-installment?student_installment_id=${Number(
            id
          )}&receive=${received == 0 ? 1 : 0}`,
          {
            method: "PATCH",
          }
        );

        const responseData = await response.json();
      } catch (error) {
        console.log(error.message);
        handleInstallmentsToggle(index, id, received);
        toast.warn("حصل خطأ");
      }
    };
    toggleInstallment();
    handleInstallmentsToggle(index, id, received == 0 ? 1 : 0);
    toast.success("تم تغيير حالة القسط");
  };
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

  const render_installments = (student, installment, index) => {
    const installment_received = student.installment_received.filter(
      (installment_received) =>
        installment_received.installment_id == installment.id
    )[0];
    if (installment_received) {
      if (
        installment_received.received == "1" &&
        installment.id == installment_received.installment_id
      ) {
        return (
          <td className="t-date" key={installment_received.id}>
            <FontAwesomeIcon
              icon="check-circle"
              size="2x"
              color="green"
              className="check-icon"
              onClick={() =>
                setConfirmModal({
                  ...confirmModal,
                  visbile: true,
                  index: index,
                  installment_received_id: installment_received.id,
                  received: installment_received.received,
                })
              }
            />
          </td>
        );
      } else if (
        installment_received.received == "0" &&
        installment.id == installment_received.installment_id
      ) {
        return (
          <td className="t-date" key={installment_received.id}>
            <FontAwesomeIcon
              icon="times-circle"
              size="2x"
              className="times-icon"
              onClick={() =>
                setConfirmModal({
                  ...confirmModal,
                  visbile: true,
                  index: index,
                  installment_received_id: installment_received.id,
                  received: installment_received.received,
                })
              }
            />
          </td>
        );
      }
    } else {
      return <td className="t-date" key={installment.id}></td>;
    }
  };

  const render_table = () => {
    if ((searchType != "0") | (searchInstitute != "0")) {
      const render_data = searchedData.students.map((student, index) => {
        return (
          <tr key={student.id} className="d-flex font-weight-bold text-white">
            <td className="t-id">{index + 1}</td>
            <td className="t-name">{student.name}</td>
            {searchedData.installments.map((installment) => {
              return render_installments(student, installment, index);
            })}
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
              <th className="t-id">&nbsp;</th>
              <th className="t-name">&nbsp;</th>
              {searchedData.installments.map((installment) => {
                return (
                  <th key={installment.id} className="t-date">
                    <button
                      onClick={() =>
                        handleReceiveInstallmentsButton(installment.id)
                      }
                      className="btn btn-success text-white"
                    >
                      استلام كل الاقساط
                    </button>
                  </th>
                );
              })}
            </tr>
            <tr className="d-flex">
              <th className="t-id">ت</th>
              <th className="t-name">الاسم</th>
              {searchedData.installments.map((installment) => {
                return (
                  <th key={installment.id} className="t-date">
                    معهد {installment.institute_name}
                    <br />
                    القسط {installment.name}
                    <br />
                    {installment.date}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>{render_data}</tbody>
        </table>
      );
    } else if (searchType == "0") {
      const render_data = data.students.map((student, index) => {
        return (
          <tr key={student.id} className="d-flex font-weight-bold text-white">
            <td className="t-id">{index + 1}</td>
            <td className="t-name">{student.name}</td>
            {data.installments.map((installment) => {
              return render_installments(student, installment, index);
            })}
            {/* <td>
              <button
                onClick={() => handleEditButton(student)}
                className="btn btn-secondary text-white"
              >
                تعديل
              </button>
            </td> */}
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
              <th className="t-id">&nbsp;</th>
              <th className="t-name">&nbsp;</th>
              {data.installments.map((installment) => {
                return (
                  <th key={installment.id} className="t-date">
                    <button
                      onClick={() =>
                        handleReceiveInstallmentsButton(installment.id)
                      }
                      className="btn btn-success text-white"
                    >
                      استلام كل الاقساط
                    </button>
                  </th>
                );
              })}
            </tr>
            <tr className="d-flex">
              <th className="t-id">ت</th>
              <th className="t-name">الاسم</th>
              {data.installments.map((installment) => {
                return (
                  <th key={installment.id} className="t-date">
                    معهد {installment.institute_name}
                    <br />
                    القسط {installment.name}
                    <br />
                    {installment.date}
                  </th>
                );
              })}
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
            id="searchStudent"
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
                <div className="col-1 pt-1">
                  <select
                    id="institute"
                    onChange={handleInstituteChange}
                    className="form-control"
                    dir="rtl"
                    value={searchInstitute}
                  >
                    <option value="0" defaultValue>
                      المعهد
                    </option>
                    {institutes.map((institute) => (
                      <option key={institute.id} value={institute.id}>
                        {institute.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-2">
                  <h2 className="text text-white">اقساط الطلاب</h2>
                </div>
              </div>
            </div>
            <ConfirmModal
              show={confirmModal.visbile}
              onHide={() =>
                setConfirmModal({ ...confirmModal, visbile: false })
              }
              handleToggleButton={handleInstallmentsToggleButton}
              index={confirmModal.index}
              student_id={confirmModal.installment_received_id}
              done={confirmModal.received}
            />
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
