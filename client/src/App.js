import "./App.css";
import { Route, Routes } from "react-router-dom";
import AddVideo from "./pages/AddVideo";
import CreateCourse from "./pages/CreateCourse";
import CreateBlog from "./pages/CreateBlog";
import Header from "./components/Header";
import Login from "./pages/Login";
import { useEffect } from "react";
import Activation from "./pages/Activation";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Message from "./components/Message";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Payment from "./pages/Payment";
import Completion from "./pages/Completion";
import AddMemberShip from "./pages/AddMemberShip";
import Plans from "./pages/Plans";
import Profile from "./pages/Profile";
import VideoPlayer from "./pages/Video";
import Dashboard from "./pages/Dashboard";
import CertificateList from "./pages/CertificateList";
import MyCourses from "./pages/MyCourses";
import { useUserStore } from "./context/UserContext";
import AdminCourseManager from "./pages/AdminCourseManager";
import { MdOutlineDashboard, MdOutlineManageHistory } from "react-icons/md";
import { SiCoursera } from "react-icons/si";
import { FaBloggerB } from "react-icons/fa6";
import { CgDollar } from "react-icons/cg";
import { IoVideocam } from "react-icons/io5";
import AdminStat from "./pages/AdminStat";
import HeroForm from "./pages/HeroForm";
import ManageCourses from "./pages/ManageCourses";
import AdminCourse from "./pages/AdminCourse";
import UpdateCourse from "./pages/UpdateCourse";
import AdminVideos from "./pages/AdminVideos";
import ManageVideos from "./pages/ManageVideos";
import UpdateVideo from "./pages/UpdateVideo";
import ManageBlogs from "./pages/ManageBlogs";
import AdminBlogs from "./pages/AdminBlogs";
import UpdateBlog from "./pages/UpdateBlogs";
import Applications from "./pages/Applications";
import ApplicationPage from "./pages/ApplicationPage";
import ClubApplicationForm from "./pages/ClubApplicationForm";
import CoachApplicationForm from "./pages/CoachApplicationForm";

function App() {
  const { user } = useUserStore();
  useEffect(() => {
    console.log("App initialized ,", process.env.REACT_APP_API_URL);
  }, []);

  const links =
    user?.role === "admin"
      ? [
          {
            id: 1,
            name: "Profile",
            icon: <MdOutlineDashboard />,
            href: "",
          },
          {
            id: 2,
            name: "Manage Course",
            icon: <SiCoursera />,
            href: "/manage-courses",
          },
          {
            id: 4,
            name: "Manage Video",
            icon: <IoVideocam />,
            href: "/manage-videos",
          },
          {
            id: 5,
            name: "Blogs",
            icon: <FaBloggerB />,
            href: "/manage-blogs",
          },
          {
            id: 7,
            name: "New Membership",
            icon: <CgDollar />,
            href: "/new-membership",
          },
          {
            id: 8,
            name: "Update Heor",
            icon: <CgDollar />,
            href: "/update-hero",
          },
        ]
      : [
          {
            id: 1,
            name: "Profile",
            href: "/",
          },
          {
            id: 2,
            name: "My Courses",
            href: "/my-courses",
          },
          {
            id: 3,
            name: "Certificates",
            href: "/certificates",
          },
        ];

  useEffect(() => {
    console.log("Cnfition Of : ", !user?.role === "admin" ? "Good" : "Bad");
  });
  return (
    <div className="App overflow-hidden min-h-[100dvh] relative font-roboto overflow-x-hidden w-full bg-blackColor">
      <Message />
      {user?.role === "admin" ? null : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/dashboard" element={<Dashboard links={links} />}>
          <Route
            path=""
            element={user?.role === "admin" ? <AdminStat /> : <Profile />}
          />
          <Route path="certificates" element={<CertificateList />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="new-video" element={<AddVideo />} />
          <Route path="new-blog" element={<CreateBlog />} />
          <Route path="manage-courses" element={<AdminCourse />}>
            <Route path="" element={<ManageCourses />} />
            <Route path="new-course" element={<CreateCourse />} />
            <Route path="course-playlist" element={<AdminCourseManager />} />
            <Route path="update-course/:id" element={<UpdateCourse />} />
          </Route>
          <Route path="manage-videos" element={<AdminVideos />}>
            <Route path="" element={<ManageVideos />} />
            <Route path="new-video" element={<AddVideo />} />
            <Route path="update-video/:videoId" element={<UpdateVideo />} />
          </Route>
          <Route path="manage-blogs" element={<AdminBlogs />}>
            <Route path="" element={<ManageBlogs />} />
            <Route path="new-blog" element={<CreateBlog />} />
            <Route path="update-blog/:id" element={<UpdateBlog />} />
          </Route>
          <Route path="new-course" element={<CreateCourse />} />
          <Route path="manage-course" element={<AdminCourseManager />} />
          <Route path="new-membership" element={<AddMemberShip />} />
          <Route path="update-hero" element={<HeroForm />} />
        </Route>
        <Route path="/pricing" element={<Plans />} />
        <Route
          path="/club-application-form/:id"
          element={<ClubApplicationForm />}
        />
        <Route
          path="/coach-application-form/:id"
          element={<CoachApplicationForm />}
        />
        <Route path="/applications/:type" element={<Applications />} />
        <Route path="/application/:id" element={<ApplicationPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/membership/create" element={<AddMemberShip />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/video/:courseId/:videoId" element={<VideoPlayer />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activation/:id" element={<Activation />} />
      </Routes>
    </div>
  );
}

export default App;
