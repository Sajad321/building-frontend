import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
const apiUrl = process.env.API_URL;

function AddOfficeDetails({ page, dataToChange, office, sideBarShow }) {
  const [dataToSend, setDataToSend] = useState({
    id: "",
    renter: "",
    date_of_receipt: "",
    date_of_claiming: "",
    amount: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (Object.keys(dataToChange).length != 0) {
      setDataToSend(dataToChange);
    }
    // console.log(document.getElementById("myimage").src);
  }, []);
  const handleRenterChange = (e) =>
    setDataToSend({ ...dataToSend, renter: e.target.value });
  const handleAmountChange = (e) => {
    setDataToSend({ ...dataToSend, amount: Number(e.target.value) });
  };
  const handleDateOfReceiptChange = (e) =>
    setDataToSend({ ...dataToSend, date_of_receipt: e.target.value });
  const handleDateOfClaimingChange = (e) =>
    setDataToSend({ ...dataToSend, date_of_claiming: e.target.value });
  const handleNotesChange = (e) =>
    setDataToSend({ ...dataToSend, notes: e.target.value });

  const saveOfficeDetails = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `${apiUrl}/offices/${office.id}` +
          `${
            dataToSend.id != ""
              ? `?office_details_id=${dataToSend.id}&renter=${dataToSend.renter}&amount=${dataToSend.amount}&date_of_receipt=${dataToSend.date_of_receipt}&date_of_claiming=${dataToSend.date_of_claiming}&notes=${dataToSend.notes}`
              : `?renter=${dataToSend.renter}&amount=${dataToSend.amount}&date_of_receipt=${dataToSend.date_of_receipt}&date_of_claiming=${dataToSend.date_of_claiming}&notes=${dataToSend.notes}`
          }`,
        {
          method: dataToSend.id != "" ? "PATCH" : "POST",
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },

          // JSON.stringify({
          //   ...dataToSend,
          //   institute_id: Number(dataToSend.institute_id),
          //   phone: Number(dataToSend.phone),
          // }),
        }
      );

      const responseData = await response.json();

      toast.success("تم حفظ الاضافة");
      page();
    } catch (error) {
      console.log(error.message);
      setSaving(false);
      toast.error("فشل الحفظ");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveOfficeDetails();
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
            <div className="col-7 p-2 offset-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="col-7 offset-1 order-last order-md-first">
                    <input
                      id="name"
                      type="text"
                      placeholder="الاسم"
                      className="form-control text"
                      onChange={handleRenterChange}
                      value={dataToSend.renter}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="name"
                    className="col-2 col-form-label text-center text-white order-first order-md-last"
                  >
                    اسم المؤجر
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-7 offset-1 order-last order-md-first">
                    <input
                      id="date_of_receipt"
                      type="date"
                      className="form-control text"
                      onChange={handleDateOfReceiptChange}
                      value={dataToSend.date_of_receipt}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="date_of_receipt"
                    className="col-12 col-md-2 col-form-label text-center text-white order-first order-md-last"
                  >
                    تاريخ الاستلام
                  </label>
                </div>

                <div className="form-group row">
                  <div className="col-7 offset-1 order-last order-md-first">
                    <input
                      id="date_of_claiming"
                      type="date"
                      className="form-control text"
                      onChange={handleDateOfClaimingChange}
                      value={dataToSend.date_of_claiming}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="date_of_claiming"
                    className="col-12 col-md-2 col-form-label text-center text-white order-first order-md-last"
                  >
                    تاريخ الاستحقاق
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-7 offset-1 order-last order-md-first">
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
                  <div className="col-7 offset-1 order-last order-md-first">
                    <input
                      id="note"
                      type="text"
                      onChange={handleNotesChange}
                      placeholder="الملاحظات"
                      className="form-control text"
                      value={dataToSend.notes}
                      // required
                    ></input>
                  </div>
                  <label
                    htmlFor="note"
                    className="col-12 col-md-2 col-form-label text-center text-white order-first order-md-last"
                  >
                    الملاحظات
                  </label>
                </div>

                <div className="form-group row">
                  <div className="col-3 offset-2 mt-3">
                    {!saving ? (
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        حفظ الاضافة
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

export default AddOfficeDetails;
