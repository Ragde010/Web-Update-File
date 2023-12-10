import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Programs from "./Programs";
import LoginOption from "./components/LoginOption";
import EmployeeRegister from "./EmployeeRegister";
import EmployeeLogin from "./EmployeeLogin";
import Adminpage from "./AdminDashboard/Adminpage";
import Create from "./AdminDashboard/Create";
import Update from "./AdminDashboard/Update";
import ViewStudent from "./AdminDashboard/ViewStudent";
import AddCourse from "./StudentDashboard/AddCourse";
import Dashboard from "./AdminDashboard/Dashboard";
import NewPrograms from "./NewPrograms";
import NewLogin from "./NewLogin";
import NewSignup from "./NewSignup";
import {UserAuthContextProvider} from '../src/context/UserAuthContext'
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import StudentAddCourse from "./StudentDashboard/StudentAddCourse";
import StudentDashboard from "./StudentDashboard/StudentDashboard";
import ProtectedRouter from "./ProtectedRouter";
import Messages from "./StudentDashboard/Messages";
import ExchangeCourse from "./StudentDashboard/ExchangeCourse";
import {AdminAuthContextProvider} from '../src/context/AdminAuthContext'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AdminAuthContextProvider>
      <UserAuthContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/newlogin" element={<NewLogin />}></Route>
        <Route path="/newsignup" element={<NewSignup />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/employee-register" element={<EmployeeRegister />}></Route>
        <Route path="/employee-login" element={<EmployeeLogin />}></Route>
        <Route path="/programs" element={<Programs />}></Route>
        <Route path="/login-option" element={<LoginOption />}></Route>
        <Route path="/admin-page" element={<Adminpage />} />
        <Route path="/create-course" element={<Create />} />
        <Route path="/update-course/:id" element={<Update />} />
        <Route path="/viewstudentList" element={<ViewStudent />} />
        <Route path="/student-course" element={<AddCourse />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newprogram" element={<NewPrograms />} />
        <Route path="/newregistration" element={<Register />} />
        <Route path="/newaddcourse" element={<StudentAddCourse />} />
        <Route path="/exchangecourse" element={<ExchangeCourse />} />
        <Route path="/student-dashboard" element={<ProtectedRouter><StudentDashboard /></ProtectedRouter>} />
        <Route path="/home" element={<Home />}></Route>
      </Routes>
      </UserAuthContextProvider>
      </AdminAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
