"use client";
import { useRef, useState, useEffect } from "react";
import { BiSolidCircleHalf } from "react-icons/bi";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { RiUserAddLine } from "react-icons/ri";
import { FaCheck, FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Button from "../components/Button";
import { useMessageData, useUserStore } from "../context/UserContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export const CheckAuthetication = async () => {
  try {
    await axios.get("https://bsesa-ksem.vercel.app/refresh", {
      withCredentials: true,
    });
    console.log("Good Token");
    return true;
  } catch (error) {
    console.log("Bad Token");
    window.localStorage.removeItem("user");
    return false;
  }
};
export const ErrorHandler = (Err, st) => {
  if (Err.current?.tagName.toLowerCase() === "input") {
    const intValue = Err.current.value;
    Err.current.value = st;
    Err.current.onfocus = () => {
      Err.current.value = intValue;
    };
  }
  if (Err.current?.tagName.toLowerCase() === "div") {
    const input = Err.current?.querySelector("input");
    if (input) {
      const intValue = input.value;
      input.value = st;
      input.onfocus = () => {
        input.value = intValue;
      };
    }
  }
  Err.current?.classList.add("error");
  setTimeout(() => {
    Err.current?.classList.remove("error");
  }, 1000);
};

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useUserStore();
  const { setMessage, setIcon, setShow, setErr } = useMessageData();
  const signup = useRef(null);
  const signin = useRef(null);
  const slider = useRef(null);
  const signupForm = useRef(null);
  const signinForm = useRef(null);
  const log = useRef(null);
  const emailInRef = useRef(null);
  const emailUpRef = useRef(null);
  const passwordInRef = useRef(null);
  const passwordUpRef = useRef(null);
  const conPasswordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const SuccessImg = useRef(null);

  const [see, setSee] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailIn, setEmailIn] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const [passwordUp, setPasswordUp] = useState("");
  const [conPassword, setConPassword] = useState("");

  const [status, setStatus] = useState("normal");
  const [statusIn, setStatusIn] = useState("normal");

  // --------------- Error Handler for Sign Up and Sign In ----------------

  const SignUp = async (e) => {
    e.preventDefault();
    console.log("Email", emailUp);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (firstName.length < 3) {
      ErrorHandler(firstNameRef, "User Name must be at least 3 characters");
      return;
    }
    if (lastName.length < 3) {
      ErrorHandler(lastNameRef, "User Name must be at least 3 characters");
      return;
    }
    if (!emailRegex.test(emailUp)) {
      ErrorHandler(emailUpRef, "Email is not a valid");
      return;
    }
    if (passwordUp.length < 6) {
      ErrorHandler(passwordUpRef, "Password must be at least 6 characters");
      return;
    }
    setStatus("checking");
    try {
      const { data } = await axios.post(
        "https://bsesa-ksem.vercel.app/userCreate",
        {
          firstName,
          lastName,
          password: passwordUp,
          email: emailUp,
        },
        {
          withCredentials: true,
        }
      );

      setErr(false);
      setMessage("Sign Up Success");
      setIcon(<FaCheck />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);

      setTimeout(() => {
        setStatusIn("checked");
        setTimeout(() => {
          Success("login", "/activation/" + data.token);
        }, 400);
      }, 400);
    } catch (error) {
      console.log(error);
      setStatus("error");
      if (error?.response?.data?.message.includes("User already exist")) {
        console.log(true);
        ErrorHandler(emailUpRef, "User already exist");
      }
      setErr(true);
      setMessage(error?.response?.data?.message);
      setIcon(<IoClose />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
      setTimeout(() => setStatusIn("normal"), 400);
    }
  };

  const SignIn = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailIn)) {
      ErrorHandler(emailInRef, "Email is not a valid");
      return;
    }
    if (passwordIn.length < 6) {
      ErrorHandler(passwordInRef, "Password must be at least 6 characters");
      return;
    }
    setStatusIn("checking");
    const password = passwordIn;
    const email = emailIn;
    try {
      const { data } = await axios.post(
        "https://bsesa-ksem.vercel.app/login",
        {
          password,
          email,
        },
        {
          withCredentials: true,
        }
      );
      login(data.user);
      setErr(false);
      setMessage("Login successfully");
      setIcon(<FaCheck />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
      setTimeout(() => {
        setStatusIn("checked");
        setTimeout(() => {
          Success("login", data.user?.role === "admin" ? "/dashboard" : "/");
        }, 400);
      }, 400);
    } catch (error) {
      // const { message = null } = response?.data;
      setStatus("error");
      if (error?.response?.data?.message?.includes("Email Dosen't exist")) {
        ErrorHandler(emailInRef, "Email Dosen't exist");
      }
      if (error?.response?.data?.message?.includes("Password incorrect")) {
        ErrorHandler(passwordInRef, "Password incorrect");
      }
      setErr(true);
      setMessage(error?.response?.data?.message);
      setIcon(<IoClose />);

      setShow(true);

      setTimeout(() => setShow(false), 1200);

      setTimeout(() => setStatusIn("normal"), 400);
    }
  };

  const Success = (st, location) => {
    box1.current?.classList.add("translate-x-[100%]");
    box3.current?.classList.add("translate-x-[-100%]");
    setTimeout(() => {
      box1.current?.classList.add("hidden");
      box3.current?.classList.add("hidden");
      box2.current?.classList.remove("left-[8%]");
      box2.current?.classList.add("translate-x-[-50%]", "left-[50%]");
      setTimeout(() => {
        box2.current?.classList.add("duration-500");
        box2.current?.classList.add("scale-110");
        setTimeout(() => {
          if (st === "signup") {
            signup.current?.classList.add("translate-y-[-200%]");
          } else {
            signin.current?.classList.add("translate-y-[100%]");
          }
          SuccessImg.current?.classList.remove("translate-y-[-300%]");
          SuccessImg.current?.classList.add("translate-y-[-200%]");
          setTimeout(() => navigate(location), 200);
        }, 100);
      }, 200);
    }, 300);
  };

  const ClickHandler = (st) => {
    if (st === "up") {
      signin.current?.classList.replace(
        "translate-y-[100%]",
        "translate-y-[0%]"
      );
      signup.current?.classList.replace(
        "translate-y-[-100%]",
        "translate-y-[-200%]"
      );
      slider.current?.classList.replace("top-[60%]", "top-[20%]");
      signinForm.current?.classList.replace(
        "translate-y-[100%]",
        "translate-y-[0%]"
      );
      signupForm.current?.classList.replace(
        "translate-y-[-100%]",
        "translate-y-[-200%]"
      );
      setEmailUp("");
      setPasswordUp("");
      setConPassword("");
      setFirstName("");
      setLastName("");
    }
    if (st === "down") {
      signin.current?.classList.replace(
        "translate-y-[0%]",
        "translate-y-[100%]"
      );
      signup.current?.classList.replace(
        "translate-y-[-200%]",
        "translate-y-[-100%]"
      );
      slider.current?.classList.replace("top-[20%]", "top-[60%]");

      signinForm.current?.classList.replace(
        "translate-y-[0%]",
        "translate-y-[100%]"
      );
      signupForm.current?.classList.replace(
        "translate-y-[-200%]",
        "translate-y-[-100%]"
      );
      setEmailIn("");
      setPasswordIn("");
    }
    log.current?.classList.add("translate-y-[6px]");
    setTimeout(() => log.current?.classList.remove("translate-y-[6px]"), 200);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-w-[100%] bg-secondary text-blackCOlor min-h-[100vh] flex justify-center items-center">
      <div
        ref={log}
        className="log duration-300 w-[90%] relative flex  items-center  h-[500px] mx-[auto] bg-transparent "
      >
        {/*-------------------- Slideer ---------------------------- */}
        <div
          className="w-full hidden md:flex md:w-[8%] justify-self-start h-[50px] md:h-full  md:flex-col items-center HeaderShadow duration-300"
          ref={box1}
        >
          <div
            ref={slider}
            className="h-[40%] absolute left-0 top-[20%] w-1 bg-primary duration-300"
          ></div>
          <div className="h-[20%] flex items-center justify-center">
            <div>
              <BiSolidCircleHalf className=" rotate-90 text-[40px] text-primary" />
              <BiSolidCircleHalf className=" rotate-90 text-[40px] translate-y-[-55%] text-primary" />
            </div>
          </div>
          <div
            className="w-full h-[40%] flex flex-col items-center justify-center"
            onClick={() => ClickHandler("up")}
          >
            <HiOutlineShieldCheck className="text-[30px] mb-3" />
            <p className="text-[16px]"> Sign in </p>
          </div>
          <div
            className="w-full h-[40%] flex flex-col items-center justify-center"
            onClick={() => ClickHandler("down")}
          >
            <RiUserAddLine className="text-[30px] mb-3" />
            <p className="text-[16px]"> Sign up</p>
          </div>
        </div>

        {/* ---------------- Sign images ----------------------*/}
        <div
          className=" hidden md:block md:w-[54%] absolute left-[8%] top-[50%] translate-y-[-50%] z-50 duration-300 h-[105%] md:h-[110%]   bg-primary overflow-hidden HeaderShadow"
          ref={box2}
        >
          {/* ---------------- image Sing in -------------------- */}
          <div
            className="translate-y-[0%] h-full duration-300 flex items-center justify-center"
            ref={signin}
          >
            <img
              src="/login/login.jpg"
              alt="Example Image"
              className="w-full h-full"
            />
          </div>
          {/* ---------------- image Sing up -------------------- */}
          <div
            className=" translate-y-[-200%] h-full duration-300 flex items-center justify-center"
            ref={signup}
          >
            <img
              src="/login/signup.jpg"
              alt="Example Image"
              className="w-full h-full"
            />
          </div>
          {/* ---------------- image Success-------------------- */}
          <div
            className=" translate-y-[-300%] h-full duration-300 flex items-center justify-center"
            ref={SuccessImg}
          >
            <h1 className="px-10 text-[4rem] text-white"> Success </h1>
            {/* <img
              src="/images/success.png"
              alt="Example Image"
              className="w-full h-full"
            /> */}
          </div>
        </div>

        {/* ---------------- Sign forms ----------------------*/}
        <div
          className="block w-[350px] mx-auto  md:w-[38%] md:absolute right-0 top-0 h-[450px] md:h-full overflow-hidden HeaderShadow duration-300"
          ref={box3}
        >
          {/* ---------------- Sign In from ----------------------*/}
          <div
            ref={signinForm}
            className="w-full h-full translate-y-[0%] flex items-center justify-center duration-300 "
          >
            <div className="w-full">
              <h1 className="text-[1rem] font-light text-center py-[20px]">
                You Don't Have an account ?{" "}
                <span
                  className="  text-primary font-bold  cursor-pointer"
                  onClick={() => ClickHandler("down")}
                >
                  {" "}
                  Sign Up{" "}
                </span>
              </h1>
              <form
                action=""
                className="w-[70%] mx-auto flex flex-col items-center gap-5 md:w-[90%]"
              >
                <input
                  ref={emailInRef}
                  type="email"
                  placeholder="Email"
                  className={`w-full py-2 px-3 rounded-[8px] bg-transparent max-w-[250px] outline-none border-[1px] border-solid border-primary`}
                  onChange={(e) => setEmailIn(e.target.value)}
                  value={emailIn}
                />
                <div
                  className=" w-full py-2 px-3 rounded-[8px]  bg-transparent max-w-[250px] flex items-center justify-between border-[0.5px] border-solid  border-primary"
                  ref={passwordInRef}
                >
                  <input
                    type={see ? "text" : "password"}
                    placeholder="Password"
                    className="outline-none bg-transparent"
                    onChange={(e) => setPasswordIn(e.target.value)}
                    value={passwordIn}
                  />
                  {!see ? (
                    <FaEye
                      className=" cursor-pointer "
                      onClick={() => setSee(true)}
                    />
                  ) : (
                    <FaEyeSlash
                      className=" cursor-pointer "
                      onClick={() => setSee(false)}
                    />
                  )}
                </div>
                <div
                  className="w-full max-w-[250px]"
                  onClick={(e) => SignIn(e)}
                >
                  <Button data="Sign In" status={statusIn} />
                </div>
                {/* <div className="w-full max-w-[250px] ">
                  <button className="flex items-center justify-center cursor-pointer gap-3 bg-[#34A853] rounded-[6px] w-full  py-2 px-3  mx-auto">
                    {" "}
                    Google <FaGoogle className="text-[22px]" />
                  </button>
                </div> */}
              </form>
            </div>
          </div>

          {/* ---------------- Sign Up from ----------------------*/}
          <div
            ref={signupForm}
            className="w-full h-full translate-y-[-200%] flex items-center justify-center duration-300"
          >
            <div className="w-full">
              <h1 className="text-[1rem] font-light text-center py-[20px]">
                You Have an account Already ?{" "}
                <span
                  className="  text-primary font-bold   cursor-pointer"
                  onClick={() => ClickHandler("up")}
                >
                  {" "}
                  Sign In{" "}
                </span>
              </h1>
              <form
                action=""
                className="w-[70%] mx-auto flex flex-col items-center gap-5 md:w-[90%]"
              >
                <input
                  ref={firstNameRef}
                  type="text"
                  placeholder="First Name"
                  className=" w-full py-2 px-3 rounded-[8px]  bg-transparent max-w-[250px] outline-none border-[0.5px] border-solid  border-primary"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <input
                  ref={lastNameRef}
                  type="text"
                  placeholder="Last Name"
                  className=" w-full py-2 px-3 rounded-[8px]  bg-transparent max-w-[250px] outline-none border-[0.5px] border-solid  border-primary"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                <input
                  ref={emailUpRef}
                  type="email"
                  placeholder="Email"
                  className=" w-full py-2 px-3 rounded-[8px]  bg-transparent max-w-[250px] outline-none border-[0.5px] border-solid  border-primary"
                  onChange={(e) => setEmailUp(e.target.value)}
                  value={emailUp}
                />
                <div
                  className=" w-full py-2 px-3 rounded-[8px]  bg-transparent max-w-[250px] flex items-center justify-between border-[0.5px] border-solid  border-primary"
                  ref={passwordUpRef}
                >
                  <input
                    type={see ? "text" : "password"}
                    placeholder="Password"
                    className="outline-none bg-transparent"
                    onChange={(e) => setPasswordUp(e.target.value)}
                    value={passwordUp}
                  />
                  {!see ? (
                    <FaEye
                      className=" cursor-pointer "
                      onClick={() => setSee(true)}
                    />
                  ) : (
                    <FaEyeSlash
                      className=" cursor-pointer "
                      onClick={() => setSee(false)}
                    />
                  )}
                </div>
                <div
                  className="w-full max-w-[250px]"
                  onClick={(e) => SignUp(e)}
                >
                  <Button data="Sign Up" status={status} />
                </div>
                {/* <div className="w-full max-w-[250px] ">
                  <button className="flex items-center justify-center cursor-pointer gap-3 bg-[#34A853] rounded-[6px] w-full  py-2 px-3  mx-auto">
                    {" "}
                    Google <FaGoogle className="text-[22px]" />
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
