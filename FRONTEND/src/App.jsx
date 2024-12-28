import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "../src/components/auth/Login";
import SignUp from "../src/components/auth/SignUp";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/layouts/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import CreateJob from "./components/admin/CreateJob";
import JobApplicants from "./components/admin/JobApplicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  //for admin

  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute> 
  },
  {
    path: "/admin/companies/create",
    element:<ProtectedRoute><CreateCompany /></ProtectedRoute> ,
  },
  {
    path: "/admin/company/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>,
  },
  //job routes by admin
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>,
  },

  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><CreateJob /></ProtectedRoute>,
  },

  //applicants routes

  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><JobApplicants /></ProtectedRoute>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
