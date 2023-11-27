import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/AuthFiles/Login";
import Signup from "./pages/AuthFiles/Signup";
import Navbar from "./components/common/Navbar";
import Error from "./pages/Error";
import ForgotPassword from "./pages/AuthFiles/ForgotPassword";
import UpdatePassword from "./pages/AuthFiles/UpdatePassword";
import VerifyEmail from "./pages/AuthFiles/VerifyEmail";
import OpenRoute from "./components/core/Auth/OpenRoute";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings/index";
import EnrolledCourses from "./components/core/Dashboard/Student/EnrolledCourses";
import Cart from "./components/core/Dashboard/Student/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyCourses from "./components/core/Dashboard/Instructor/MyCourses.jsx";
import EditCourse from "./components/core/Dashboard/Instructor/EditCourse/index.js";
import Catalog from "./pages/Catalog.jsx";


//agr kuch hua to yaha error hai
import AddCourse from "./components/core/Dashboard/Instructor/AddCourse.jsx";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile)


  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-inter flex flex-col text-inter text-white blur-bg ">


      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/catalog/:catalogName"  element={<Catalog />} />


        {/* ---------------   Auth Routes  ---------------------------- */}



        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />
        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />
        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />
        <Route path="/update-password/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />
        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />


        {/* ----------------------- Dashboard Routes -------------------- */}

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }

        >

          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />

          {/* ----------------- STUDENT Routes ------------------------ */}
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>

                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="/dashboard/cart" element={<Cart />} />

              </>
            )
          }

          {/* -------------------- Instructor Routes ----------------------------- */}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>

                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />}/>
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />}/>
               <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
               
           

              </>
            )
          }


        </Route>










        {/* --------------------------- Error Route -------------------------- */}

        <Route path="*" element={<Error />} />





      </Routes>
    </div>
  );
}

export default App;
