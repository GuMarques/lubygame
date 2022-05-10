import { FC, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./notification.css";
import AppContext from "../../context/appContext";

export interface INotification {
  text: string;
  type: "info" | "success" | "error" | "warning" | "default";
}

const NotificationDispatcher: FC = () => {
  const { account, notification } = useContext(AppContext);
  useEffect(() => {
    if (account) {
      fireNotification({ text: "Conta selecionada: " + account, type: "info" });
    }
  }, [account]);

  useEffect(() => {
    if (notification) {
      fireNotification(notification);
    }
  });

  const fireNotification = ({ text, type }: INotification) => {
    switch (type) {
      case "info":
        toast.info(text);
        break;
      case "success":
        toast.success(text);
        break;
      case "error":
        toast.error(text);
        break;
      case "warning":
        toast.warning(text);
        break;
      default:
        toast(text);
        break;
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
};

export default NotificationDispatcher;
