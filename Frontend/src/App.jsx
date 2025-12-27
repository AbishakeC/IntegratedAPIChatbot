import { Routes, Route } from "react-router-dom";

import TopBar from "./Components/TopBar";
import MainpageLayout from "./Layout/MainpageLayout";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";

import ProtectedRoute from "./Components/ProtectedRoute";
import LandingPage from "./Pages/LandingPage";


const App = () => {
  return (
    <div className="">
      {/* <TopBar /> */}

      <div className="flex flex-row ">
        {/* <video src={greenvid}  className="absolute z-0"/> */}
        
        <Routes>
          {/* Public routes */}
          <Route path="/Platform" element={<MainpageLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Registration" element={<Register />} />
          <Route path="/" element={<LandingPage />} />

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
                <Profile /> }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
