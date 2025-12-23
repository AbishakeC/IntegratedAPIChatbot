import { Routes, Route } from "react-router-dom";

import TopBar from "./Components/TopBar";
import MainpageLayout from "./Layout/MainpageLayout";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Credits from "./Pages/Credits";
import Chat from "./Pages/Chat";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <TopBar />

      <div className="flex flex-row scale-95">
        <Routes>
          {/* Public routes */}
          <Route path="/Platform" element={<MainpageLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
