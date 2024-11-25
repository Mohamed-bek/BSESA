import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Button = ({ data, status }) => {
  return (
    <button className="w-full overflow-hidden h-[40px] relative py-2 px-3 rounded-[8px] bg-primary text-white max-w-[250px] outline-none block cursor-pointer">
      {/* Loader Animation */}
      <div
        className={`w-full h-full absolute top-0 left-0 flex items-center justify-center duration-300 ${
          status === "checking" ? "translate-y-[0%]" : "translate-y-[-100%]"
        }`}
      >
        <div className="loaderButton w-[25px] [aspect-ratio:1] rounded-[50%] border-[3px] border-solid border-white"></div>
      </div>

      {/* Normal State Text */}
      <div
        className={`w-full h-full absolute top-0 left-0 flex items-center justify-center duration-300 ${
          status === "normal" ? "translate-y-[0%]" : "translate-y-[100%]"
        }`}
      >
        {data}
      </div>

      {/* Checked State Icon */}
      <div
        className={`w-full h-full absolute top-0 left-0 flex items-center justify-center duration-300 ${
          status === "checked" ? "translate-y-[0%]" : "translate-y-[-100%]"
        }`}
      >
        <FaCheck className="text-white text-[20px]" />
      </div>

      {/* Error State Icon */}
      <div
        className={`w-full h-full absolute top-0 left-0 flex items-center justify-center duration-300 ${
          status === "error" ? "translate-y-[0%]" : "translate-y-[-100%]"
        }`}
      >
        <IoCloseSharp className="text-white text-[24px]" />
      </div>
    </button>
  );
};

export default Button;
