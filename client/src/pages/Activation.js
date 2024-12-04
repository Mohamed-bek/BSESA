import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useMessageData, useUserStore } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Activation = () => {
  const [activationCode, setActivationCode] = useState(null);
  const { setMessage, setIcon, setShow, setErr } = useMessageData();
  const navigate = useNavigate();
  const { user, login } = useUserStore();
  const { id } = useParams();
  useEffect(() => {
    user && navigate("/");
  });

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "activation",
        {
          activationCode,
          token: id,
        }
      );
      login(data.user);
      setErr(false);
      setMessage("Account Activated Successefully");
      setIcon(<FaCheck />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
      navigate("/");
    } catch ({ response }) {
      console.log(response.data.error);
      setErr(true);
      setMessage(response.data.error);
      setIcon(<IoClose />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[100dvh] text-whiteColor">
      <div className="bg-primary text-white px-5 py-3 w-full max-w-[600px] HeaderShadow rounded-xl">
        <h1 className="text-[2.5rem] font-bold mb-4 text-center">
          Activate Your Account
        </h1>
        <div>
          <p className="mb-4 text-center text-[1.1rem] font-light">
            To activate your account, we have sent an activation code to your
            email. Please check your inbox.
          </p>
        </div>
        <form onSubmit={handleSubmitCode}>
          <input
            type="number"
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
            placeholder="Enter activation code"
            className="p-2 border border-gray-300 rounded mb-4 block mx-auto focus:outline-none text-black"
          />
          <button
            type="submit"
            className="bg-white text-primary block mx-auto py-2 px-4 border duration-300 border-solid border-white hover:border rounded hover:bg-primary hover:text-white text-[1.1rem] font-medium cursor-pointer"
          >
            Activate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Activation;
