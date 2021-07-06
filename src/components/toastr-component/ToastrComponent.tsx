import React from "react";
import { toast, Slide } from "react-toastify";

export interface ToastrProps {
  type: string;
  message: string;
}

const ToastrComponent = ({ type, message }: ToastrProps) => {
  return (
    <div className="flex flex-row items-start justify-start">
      <p className="mx-4 font-medium leading-5 text-white">{message}</p>
    </div>
  );
};

const showToastr = (message: string) => {
  toast.success(<ToastrComponent type="success" message={message} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
  });
};

const showErrorToastr = (error: string) => {
  toast.error(<ToastrComponent type="error" message={error} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
  });
};

export const Toastr = {
  success: showToastr,
  error: showErrorToastr,
};

export default ToastrComponent;
