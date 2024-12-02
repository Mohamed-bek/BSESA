import "./App.css";
import { Route, Routes } from "react-router-dom";
import AddVideo from "./pages/videos/AddVideo";
import CreateCourse from "./pages/courses/CreateCourse";
import CreateBlog from "./pages/blogs/CreateBlog";
import Header from "./components/Header";
import Login from "./pages/Login";
import { useEffect } from "react";
import Activation from "./pages/Activation";
import Courses from "./pages/courses/Courses";
import Course from "./pages/courses/Course";
import Message from "./components/Message";
import Home from "./pages/Home";
import Blogs from "./pages/blogs/Blogs";
import Blog from "./pages/blogs/Blog";
import Payment from "./pages/Payment";
import Completion from "./pages/Completion";
import AddMemberShip from "./pages/AddMemberShip";
import Plans from "./pages/Plans";
import Profile from "./pages/Profile";
import VideoPlayer from "./pages/videos/Video";
import Dashboard from "./pages/Dashboard";
import CertificateList from "./pages/CertificateList";
import MyCourses from "./pages/courses/MyCourses";
import { useUserStore } from "./context/UserContext";
import AdminCourseManager from "./pages/courses/AdminCourseManager";
import { MdOutlineDashboard, MdOutlineManageHistory } from "react-icons/md";
import { SiCoursera } from "react-icons/si";
import { FaBloggerB } from "react-icons/fa6";
import { CgDollar } from "react-icons/cg";
import { IoVideocam } from "react-icons/io5";
import AdminStat from "./pages/AdminStat";
import HeroForm from "./pages/HeroForm";
import ManageCourses from "./pages/courses/ManageCourses";
import AdminCourse from "./pages/courses/AdminCourse";
import UpdateCourse from "./pages/courses/UpdateCourse";
import AdminVideos from "./pages/videos/AdminVideos";
import ManageVideos from "./pages/videos/ManageVideos";
import UpdateVideo from "./pages/videos/UpdateVideo";
import ManageBlogs from "./pages/blogs/ManageBlogs";
import AdminBlogs from "./pages/blogs/AdminBlogs";
import UpdateBlog from "./pages/blogs/UpdateBlogs";
import Applications from "./pages/applications/Applications";
import ApplicationPage from "./pages/applications/ApplicationPage";
import ClubApplicationForm from "./pages/applications/ClubApplicationForm";
import CoachApplicationForm from "./pages/applications/CoachApplicationForm";
import { FaApple, FaResearchgate } from "react-icons/fa";
import ManageApplications from "./pages/applications/ManageApplications";
import ManageCoaches from "./pages/applications/ManageCoaches";
import ManageClubs from "./pages/applications/ManageClubs";
import AdminApplication from "./pages/applications/AdminApplication";
import CreateApplication from "./pages/applications/CreateApplication";
import AboutUs from "./pages/AboutUs";
import Research from "./pages/researches/Research";
import Researches from "./pages/researches/Researches";
import CreateResearch from "./pages/researches/CreateResaerch";

function App() {
  const { user } = useUserStore();
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
            id: 6,
            name: "Applications",
            icon: <FaApple />,
            href: "/manage-applications",
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
          {
            id: 9,
            name: "Update Heor",
            icon: <FaResearchgate />,
            href: "/new-research",
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
  return (
    <div className="App overflow-hidden min-h-[100dvh] relative font-roboto overflow-x-hidden w-full bg-secondary">
      <Message />
      {user?.role === "admin" ? null : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/researches" element={<Researches />} />
        <Route path="/research/:id" element={<Research />} />
        <Route path="/dashboard" element={<Dashboard links={links} />}>
          <Route path="new-research" element={<CreateResearch />} />
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
          <Route path="manage-applications" element={<AdminApplication />}>
            <Route path="" element={<ManageApplications />} />
            <Route path="new-application" element={<CreateApplication />} />
            <Route path="coaches/:id" element={<ManageCoaches />} />
            <Route path="clubs/:id" element={<ManageClubs />} />
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
