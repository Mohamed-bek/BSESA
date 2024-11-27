import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/certificate",
          {
            withCredentials: true,
          }
        );
        console.log("data ", data);
        setCertificates(data.certificate);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center text-[3rem] text-white">
        Loading certificates...
      </div>
    );
  if (error)
    return (
      <div className="w-full h-full flex justify-center items-center text-[3rem] text-white">
        Error: {error}
      </div>
    );

  return (
    <div className="p-4 bg-whiteColor text-blackColor w-full h-full">
      {certificates.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className=" text-[1.5rem] md:text-[4rem] text-center px-5">
            {" "}
            You Don't Have A Certificate{" "}
          </h1>{" "}
        </div>
      )}
      <div className="flex flex-wrap justify-start items-center gap-5 ">
        {certificates.length > 0 &&
          certificates.map((certificate, index) => (
            <div
              key={certificate._id || index}
              className="w-[250px] HeaderShadow rounded-lg overflow-hidden bg-white shadow pb-2"
            >
              <img src={certificate?.courseId?.thumbnail} className="w-full" />
              <h2 className="text-lg  text-blackColor text-center px-1 mb-2 font-semibold">
                {certificate?.courseId?.title}
              </h2>
              <a
                href={certificate?.certificate}
                target="_blank"
                className="bg-secondary text-black cursor-pointer w-[90%] mx-auto block py-2 text-center rounded-lg"
              >
                View PDF
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CertificateList;
