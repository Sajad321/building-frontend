import React from "react";

function PrintReceipt(props) {
  return (
    <div className="row receipt-font" id="print-receipt">
      <div className="col-3 text-center">
        <span className="">التاريخ {props.date}</span>
      </div>
      <div className="col-3"></div>
      <div className="col-4">
        <span className="text-center">
          بناية{" "}
          {localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token")).building
            : ""}
        </span>
      </div>
      <div className="col-2 text-right">
        <span className="">رقم الوصل</span>
      </div>

      <div className="col-11">
        <br />
      </div>

      <div className="col-1">
        <span className="text-right">{props.id}</span>
      </div>

      <div className="col-3"></div>
      <div className="col-3"></div>
      <div className="col-5">
        <span className="text-center">م/ وصل قبض</span>
      </div>

      <div className="col-12">
        <br />
      </div>

      <div className="col-12 text-right" dir="rtl">
        <p>
          استلمت من السيد/ة {props.name} مبلغ قدره {props.amount} كتابة
          .............................
        </p>
      </div>
      <div className="col-12 text-right" dir="rtl">
        <p>وذلك عن {props.expense_type}</p>
      </div>
      <div className="col-12">
        <br />
      </div>
      <div className="col-1"></div>
      <div className="col-11 text-left">
        <p>توقيع المستلم</p>
      </div>

      <div className="col-12">
        <br />
      </div>
      <div className="col-12">
        <br />
      </div>
      <div className="col-12">
        <br />
      </div>
      <div className="col-12">
        <br />
      </div>
      <div className="col-12">
        <br />
      </div>
      <div className="col-12">
        <br />
      </div>
      <div className="col-12">
        <br />
      </div>

      <div className="col-3 text-center">
        <span className="">التاريخ {props.date}</span>
      </div>
      <div className="col-3"></div>
      <div className="col-4">
        <span className="text-center">
          بناية{" "}
          {localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token")).building
            : ""}
        </span>
      </div>
      <div className="col-2 text-right">
        <span className="">رقم الوصل</span>
      </div>

      <div className="col-11">
        <br />
      </div>

      <div className="col-1">
        <span className="text-right">{props.id}</span>
      </div>

      <div className="col-3"></div>
      <div className="col-3"></div>
      <div className="col-5">
        <span className="text-center">م/ وصل قبض</span>
      </div>

      <div className="col-12">
        <br />
      </div>

      <div className="col-12 text-right" dir="rtl">
        <p>
          استلمت من السيد/ة {props.name} مبلغ قدره {props.amount} كتابة
          ..............................
        </p>
      </div>
      <div className="col-12 text-right" dir="rtl">
        <p>وذلك عن {props.expense_type}</p>
      </div>
      <div className="col-12">
        <br />
      </div>
      <div className="col-1"></div>
      <div className="col-11 text-left">
        <p>توقيع المستلم</p>
      </div>
    </div>
  );
}

export default PrintReceipt;
