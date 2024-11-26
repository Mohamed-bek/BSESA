import axios from "axios";
import React, { useEffect, useState } from "react";
import ChartComponent from "../components/ChartComponent";

function AdminStat() {
  const [primaryColor, setprimaryColor] = useState("#00adb5");
  const [usersData, setusersData] = useState({ months: [], counts: [] });
  useEffect(() => {
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-color")
      .trim();
    setprimaryColor("#00adb5");
  }, []);

  useEffect(() => {
    const GetUserState = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/admin/user_analytics",
          { withCredentials: true }
        );
        setusersData(data);
        console.log("The Data Comming is : " + data);
      } catch (error) {
        console.log(error);
      }
    };
    GetUserState();
  }, []);

  const data = {
    labels: usersData.months,
    datasets: [
      {
        label: "User ",
        data: usersData.counts,
        backgroundColor: primaryColor,
        borderColor: "rgb(0 146 68)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines for the y-axis
        },
      },
      x: {
        grid: {
          display: false, // Remove grid lines for the y-axis
        },
      },
    },
  };

  return (
    <div className="w-full h-full bg-whiteColor">
      <div className="max-w-[400px]">
        <ChartComponent data={data} options={options} type="bar" />
      </div>
    </div>
  );
}

export default AdminStat;
