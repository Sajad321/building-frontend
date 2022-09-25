import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const apiUrl = process.env.API_URL;

function Notifications({ sideBarShow }) {
  const [notifications, setNotification] = useState([]);
  const [date, setDate] = useState(toLocalISOString(new Date()).slice(0, 10));
  const getNotifications = async () => {
    try {
      const response = await fetch(`${apiUrl}/notifications`, {
        method: "GET",
        headers: {
          Authorization: `Bearer`,
        },
      });

      const responseData = await response.json();
      setNotification(
        responseData.notifications.filter(
          (notification) => notification.date_of_claiming <= date
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);
  const handleNotificationSeen = async (notification_id) => {
    try {
      const response = await fetch(
        `${apiUrl}/notifications/${notification_id}`,
        {
          method: "PATCH",
        }
      );

      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
      toast.warn("حصل خطأ");
    }
  };
  const handleDeleteNotification = async (notification_id) => {
    try {
      const response = await fetch(
        `${apiUrl}/notifications/${notification_id}`,
        {
          method: "DELETE",
        }
      );

      const responseData = await response.json();
      getNotifications();
      toast.success("تم الحذف");
    } catch (error) {
      console.log(error.message);
      toast.warn("حصل خطأ");
    }
  };
  function pad(x, width = 2, char = "0") {
    return String(x).padStart(width, char);
  }
  function toLocalISOString(dt) {
    const offset = dt.getTimezoneOffset();
    const absOffset = Math.abs(offset);
    const offHours = Math.floor(absOffset / 60);
    const offStr = pad(offHours) + ":" + pad(absOffset - offHours * 60);
    return [
      String(dt.getFullYear()),
      "-",
      pad(dt.getMonth() + 1),
      "-",
      pad(dt.getDate()),
      "T",
      pad(dt.getHours()),
      ":",
      pad(dt.getMinutes()),
      ":",
      pad(dt.getSeconds()),
      ".",
      dt.getMilliseconds(),
      offset <= 0 ? "+" : "-",
      offStr,
    ].join("");
  }

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
                  <h2 className="text text-white">الاشعارات</h2>
                </div>
              </div>
            </div>
            {notifications.map((notification) => {
              return (
                <div className="col-sm-12 p-2" key={notification.id}>
                  <div className="card card-common card-height">
                    <div className="card-body">
                      <div className="text-right text-white">
                        <h5>
                          تم استحقاق الاستلام من قبل {notification.renter} في
                          المكتب {notification.office_name}
                        </h5>
                      </div>
                      {notification.seen == 1 ? (
                        ""
                      ) : (
                        <button
                          onClick={() =>
                            handleNotificationSeen(notification.id)
                          }
                          className="btn btn-light"
                        >
                          تم
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleDeleteNotification(notification.id)
                        }
                        className="btn btn-danger mr-3"
                      >
                        حذف
                      </button>
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

export default Notifications;
