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
            href: "",
          },
          {
            id: 2,
            name: "New Course",
            href: "/new-course",
          },
          {
            id: 4,
            name: "New Video",
            href: "/new-video",
          },
          {
            id: 5,
            name: "Manage Course",
            href: "/manage-course",
          },
          {
            id: 6,
            name: "New Blog",
            href: "/new-blog",
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
    <div className="App min-h-[100dvh] relative font-roboto overflow-x-hidden w-full bg-blackColor">
      <Message />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/dashboard" element={<Dashboard links={links} />}>
          <Route path="" element={<Profile />} />
          <Route path="certificates" element={<CertificateList />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="new-video" element={<AddVideo />} />
          <Route path="new-blog" element={<CreateBlog />} />
          <Route path="new-course" element={<CreateCourse />} />
          <Route path="manage-course" element={<AdminCourseManager />} />
        </Route>
        <Route path="/pricing" element={<Plans />} />
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
