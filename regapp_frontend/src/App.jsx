/* eslint-disable no-unused-vars */
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "../src/pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import AddNewCar from "../src/pages/AddNewCar";
import EditCar from "../src/pages/EditCar";
import Profile from "../src/pages/Profile";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import PageNotFound from "../src/pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { LangSelect } from "./ui/LangSelect";
import {
  AuthenticationContext,
  useAuthDispatch,
} from "./context/AuthenticationContext";
import Welcome from "./pages/Welcome";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import SessionExpired from "./pages/SessionExpired";
import SearchResult from "./pages/SearchResult";

function App() {
  const dispatch = useAuthDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  const localToken = localStorage.getItem("token");
  let decodedToken;
  let decodedExpiredTime;

  useEffect(() => {
    if (localToken) {
      decodedToken = jwtDecode(localToken);
      decodedExpiredTime = decodedToken.exp * 1000;

      if (decodedExpiredTime < new Date()) {
        navigate("/expire");
      }
    }
  }, [location, dispatch, navigate]);

  return (
    <>
      <Routes>
        {!localToken && <Route index element={<Login />} />}
        <Route element={<AppLayout />}>
          <Route index element={<Vehicles />} />

          <Route path="vehicles" element={<Vehicles />} />
          <Route path="addnewcar" element={<AddNewCar />} />
          <Route path="editcar" element={<EditCar />} />
          <Route path="editcar/:id" element={<EditCar />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="expire" element={<SessionExpired />} />
          <Route path="searchresults" element={<SearchResult />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
            style: {
              fontWeight: "600",
            },
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
