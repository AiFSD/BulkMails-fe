import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import SendMails from "./dashboards/SendMails";
import Personal from "./dashboards/Personal";
import SettingsPage from "./dashboards/SettingsPage";
import Help from "./dashboards/Help";
import Registration from "./components/Registration";
import LogIn from "./components/LogIn";
import Navigation from "./dashboards/Navigation";
import Home from "./dashboards/Home";
import History from "./dashboards/History";
import Status from "./dashboards/Status";
import PrivateRoute from "./PrivateRoute";
import ForgotPasswordRequest from "./components/ForgotPasswordRequest"; 
import ResetPassword from "./components/ResetPassword"; 
import "bootstrap/dist/css/bootstrap.min.css";
import MailDetails from "./pages/MailDetails";
import "@fortawesome/fontawesome-free/css/all.min.css";
import EditUser from "./pages/EditUser";
import NotificationSettings from "./pages/NotificationSettings";
import PrivacySettings from "./pages/PrivacySettings";
import LanguageSettings from "./pages/LanguageSettings";
import DeleteAccount from "./pages/DeleteAccount";
import TrackLogs from "./components/TrackLogs";
import FullDataDisplay from "./pages/FullDataDisplay";
import PremiumPage from "./components/PremiumPage";
import PaymentPage from "./pages/PaymentPage";
import Explore from "./components/Explore";
import Codes from "./components/Codes";





const AppLayout = () => {
  return (
    <div className="layout">
      <Navigation />
      <div className="content-wrapper">
        {/* This is where the route components will render */}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgot-password" element={<ForgotPasswordRequest />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<Navigate to="/register" />} />

          {/* Protected routes */}
          <Route element={<AppLayout />}>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <PrivateRoute>
                  <Explore />
                </PrivateRoute>
              }
            />
            <Route
              path="/codes"
              element={
                <PrivateRoute>
                  <Codes />
                </PrivateRoute>
              }
            />
            <Route
              path="/send-mails"
              element={
                <PrivateRoute>
                  <SendMails />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <History />
                </PrivateRoute>
              }
            />
            <Route
              path="/mail-details/:id"
              element={
                <PrivateRoute>
                  <MailDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/status"
              element={
                <PrivateRoute>
                  <Status />
                </PrivateRoute>
              }
            />
            <Route
              path="/track-logs"
              element={
                <PrivateRoute>
                  <TrackLogs />
                </PrivateRoute>
              }
            />
            <Route path="/full-data" element={<FullDataDisplay />} />
            <Route
              path="/personal"
              element={
                <PrivateRoute>
                  <Personal />
                </PrivateRoute>
              }
            />
           
            <Route
              path="/change-username"
              element={<Navigate to="/personal" />}
            />
            <Route
              path="/delete-account"
              element={
                <PrivateRoute>
                  <DeleteAccount />
                </PrivateRoute>
              }
            />
            <Route path="/edit-profile" element={<Navigate to="/personal" />} />

            {/* Corrected route */}
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notification-settings"
              element={
                <PrivateRoute>
                  <NotificationSettings />
                </PrivateRoute>
              }
            />
            <Route
              path="/privacy-settings"
              element={
                <PrivateRoute>
                  <PrivacySettings />
                </PrivateRoute>
              }
            />
            <Route
              path="/language-settings"
              element={
                <PrivateRoute>
                  <LanguageSettings />
                </PrivateRoute>
              }
            />
            <Route
              path="/help"
              element={
                <PrivateRoute>
                  <Help />
                </PrivateRoute>
              }
            />
            <Route
              path="/premium"
              element={
                <PrivateRoute>
                  <PremiumPage />
                </PrivateRoute>
              }
            />
              
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
