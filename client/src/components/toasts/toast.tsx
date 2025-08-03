import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { TypeOptions } from "react-toastify";
import './toast.css'

type ToastType = Exclude<TypeOptions, "default">;

const ToastNotification = () => {
    return <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
        transition={Bounce}
    />;
};

// Function to trigger toast
export const showTopToast = (message: string, type: ToastType = "error", time: number) => {
    toast[type](message, {
        position: "top-center",
        autoClose: time | 5000,
        closeButton: true,
        className: `custom-toast`,
    });
};


export default ToastNotification;