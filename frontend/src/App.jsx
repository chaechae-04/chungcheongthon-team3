import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import SignupPage from "./pages/Auth/SignupPage.jsx";
import CalendarPage from "./pages/Calendar/CalendarPage.jsx";
import ProfilePage from "./pages/wow/profile.jsx"
import AnalysisPage from "./pages/Analysis/AnalysisPage.jsx"
import NotificationPage from "./pages/Notification/NotificationPage.jsx"
import { AuthProvider } from "./contexts/AuthProvider.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          {/* <Route path="/Alarm" element={<AlaramPage />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;