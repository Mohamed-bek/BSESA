import React from "react";
import { useMessageData } from "../context/UserContext";

function Message() {
  const { message, err, icon, show } = useMessageData();
  return (
    <div
      className={`absolute flex items-center gap-2 -top-20 left-1/2 -translate-x-1/2   text-white text-[1.3rem] font-bold z-[9999] rounded-full px-7 py-3 ${
        err ? "bg-[#d70f0f] ShadoBottonError" : "bg-primary ShadoBotton"
      } ${show ? "show" : ""} `}
    >
      {" "}
      {message}{" "}
      <span
        className={`bg-white p-1 text-[1.2rem] rounded-full ${
          err ? "text-[#d70f0f]" : "text-primary"
        }`}
      >
        {" "}
        {icon}
      </span>
    </div>
  );
}

export default Message;
