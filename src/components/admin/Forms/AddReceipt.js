import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const apiUrl = process.env.API_URL;

function AddInstitute({ page, dataToChange, sideBarShow }) {
  const [dataToSend, setDataToSend] = useState({
    id: "",
    voucher_number: "",
    name: "",
    expense_type: "",
    amount: "",
    date: "",
  });
  const [institutes, setInstitutes] = useState([]);
  useEffect(() => {
    const getStuff = async () => {
      try {
        const response = await fetch(`${apiUrl}/institute`, {
          method: "GET",
          headers: {
            Authorization: `Bearer`,
          },
        });

        const responseData = await response.json();
        setInstitutes(responseData.institutes);
      } catch (error) {
        console.log(error.message);
      }
    };
    getStuff();
    if (Object.keys(dataToChange).length) {
      setDataToSend(dataToChange);
    }
  }, []);
  const handleVoucherNumberChange = (e) =>
    setDataToSend({ ...dataToSend, voucher_number: e.target.value });
  const handleNameChange = (e) =>
    setDataToSend({ ...dataToSend, name: e.target.value });
  const handleExpenseTypeChange = (e) =>
    setDataToSend({ ...dataToSend, expense_type: e.target.value });
  const handleAmountChange = (e) =>
    setDataToSend({ ...dataToSend, amount: Number(e.target.value) });
  const handleDateChange = (e) =>
    setDataToSend({ ...dataToSend, date: e.target.value });
  const [saving, setSaving] = useState(false);
  const saveReceipt = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `${apiUrl}/expenses` +
          `${
            dataToSend.id != ""
              ? "/" + dataToSend.id
              : `?&name=${dataToSend.name}&voucher_number=${dataToSend.voucher_number}&expense_type=${dataToSend.expense_type}&amount=${dataToSend.amount}&date=${dataToSend.date}`
          }`,
        {
          method: dataToSend.id != "" ? "PATCH" : "POST",
          headers: {
            Authorization: `Bearer`,
          },
          // body: JSON.stringify(dataToSend),
        }
      );

      const responseData = await response.json();

      toast.success("تم حفظ الوصل");
      page();
    } catch (error) {
      console.log(error.message);
      setSaving(false);
      toast.error("فشل الحفظ");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveReceipt();
  };
  return (
    <section className="main">
      <div className="row padding-form m-0">
        <div
          className={
            sideBarShow
              ? "width-others-wide mr-auto main-view"
              : "width-others-narrow mr-auto main-view"
          }
          id="main-view"
        >
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5">
            <div className="col-sm-12 p-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      type="number"
                      className="form-control text"
                      onChange={handleVoucherNumberChange}
                      value={dataToSend.voucher_number}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="name"
                    className="col-12 col-md-2 col-form-label text-center text-white order-first order-md-last"
                  >
                    رقم الوصل
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      type="text"
                      id="name"
                      placeholder="الاسم"
                      className="form-control text"
                      onChange={handleNameChange}
                      value={dataToSend.name}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="name"
                    className="col-12 col-md-2 col-form-label text-center text-white order-first order-md-last"
                  >
                    الاسم
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      type="text"
                      placeholder="نوع الصرف"
                      className="form-control text"
                      onChange={handleExpenseTypeChange}
                      value={dataToSend.expense_type}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="expense_type"
                    className="col-12 col-md-2 col-form-label text-center text-white order-first order-md-last"
                  >
                    نوع الصرف
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      id="amount"
                      type="number"
                      className="form-control text"
                      onChange={handleAmountChange}
                      value={dataToSend.amount}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="amount"
                    className="col-12 col-md-2 col-form-label text-center text-white order-first order-md-last"
                  >
                    المبلغ
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      id="date"
                      type="date"
                      className="form-control text"
                      onChange={handleDateChange}
                      value={dataToSend.date}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="date"
                    className="col-12 col-md-2 col-form-label text-center text-white order-first order-md-last"
                  >
                    التاريخ
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-10 offset-1 col-sm-3 offset-sm-6 mt-3">
                    {!saving ? (
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        حفظ الوصل
                      </button>
                    ) : (
                      <button disabled className="btn btn-success btn-block">
                        يتم الارسال
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddInstitute;
