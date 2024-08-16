// import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./components/Home";
// import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";
// import TablesAdmin from "./components/tablesAdmin/Tables";

// import { logout } from "./actions/auth";
// import { clearMessage } from "./actions/message";

// import EventBus from "./common/EventBus";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// import imagehero from "../src/assets/PLAN122.png";
// import PasswordReset from "./components/ResetPassword";
// import ForgotPassword from "./components/ForgotPassword";

// const App = () => {
//   const [showAdminBoard, setShowAdminBoard] = useState(false);
//   const [isAllowed, setIsAllowed] = useState(true);

//   const { user: currentUser } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   let location = useLocation();
//   let navigate = useNavigate();

//   useEffect(() => {
//     if (["/login", "/register"].includes(location.pathname)) {
//       dispatch(clearMessage()); 
//     }
//   }, [dispatch, location]);

//   const logOut = useCallback(() => {
//     dispatch(logout());
//     navigate("/login"); 
//   }, [dispatch, navigate]);

//   useEffect(() => {
//     if (currentUser) {
//       const isAdmin = currentUser.roles.includes("ROLE_ADMIN");
//       setShowAdminBoard(isAdmin);
//       setIsAllowed(isAdmin); 
//     } else {
//       setShowAdminBoard(false);
//       setIsAllowed(true); 
//     }

//     EventBus.on("logout", () => {
//       logOut();
//     });

//     return () => {
//       EventBus.remove("logout");
//     };
//   }, [currentUser, logOut]);

//   if (currentUser && !isAllowed) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           height: '100vh',
//           textAlign: 'center',
//           backgroundColor: '#f0f0f0',
//         }}
//       >
//         <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
//           Not Allowed
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 4 }}>
//           You do not have permission to access this site.
//         </Typography>
//         <Button variant="contained" color="primary" onClick={logOut}>
//           Logout
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <div>
//       <nav className="navbar navbar-expand navbar-dark bg-dark">
//         <Link to={"/"} className="navbar-brand">
//           <img
//             src={imagehero}
//             alt="Company Logo"
//             style={{ height: '60px', width: 'auto' }} 
//           />
//         </Link>
//         <div className="navbar-nav mr-auto">
//           {showAdminBoard && (
//             <li className="nav-item">
//               <Link to={"/admin"} className="nav-link">
//                 Admin Board
//               </Link>
//             </li>
//           )}
//         </div>

//         {currentUser ? (
//           <div className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <Link to={"/profile"} className="nav-link">
//                 {currentUser.username}
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/forgot-password"} className="nav-link">
//                 Change Password
//               </Link>
//             </li>
//             <li className="nav-item">
//               <a href="/login" className="nav-link" onClick={logOut}>
//                 LogOut
//               </a>
//             </li>
//           </div>
//         ) : (
//           <div className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <Link to={"/login"} className="nav-link">
//                 Login
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link to={"/register"} className="nav-link">
//                 Sign Up
//               </Link>
//             </li>
//           </div>
//         )}
//       </nav>

//       <div className="mt-3">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/reset-password/:token" element={<PasswordReset/>}/>
//           <Route path="/forgot-password" element={<ForgotPassword />}/>
//           <Route path="/register" element={<Register />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/user" element={<BoardUser />} />
//           <Route path="/mod" element={<BoardModerator />} />
//           <Route path="/admin" element={<BoardAdmin />} />
//           <Route path="/admin/tables" element={<TablesAdmin />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Import the user icon
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import TablesAdmin from "./components/tablesAdmin/Tables";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import EventBus from "./common/EventBus";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import imagehero from "../src/assets/PLAN122.png";
import PasswordReset from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); 
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
    navigate("/login"); 
  }, [dispatch, navigate]);

  useEffect(() => {
    if (currentUser) {
      const isAdmin = currentUser.roles.includes("ROLE_ADMIN");
      setShowAdminBoard(isAdmin);
      setIsAllowed(isAdmin); 
    } else {
      setShowAdminBoard(false);
      setIsAllowed(true); 
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  if (currentUser && !isAllowed) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
          Not Allowed
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You do not have permission to access this site.
        </Typography>
        <Button variant="contained" color="primary" onClick={logOut}>
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          <img
            src={imagehero}
            alt="Company Logo"
            style={{ height: '60px', width: 'auto' }} 
          />
        </Link>
        <div className="navbar-nav mr-auto">
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                <FaUser style={{ marginRight: '20px' }} />
                Admin Tableau De Bord
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/forgot-password"} className="nav-link">
                Changer Mot De Passe
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Déconnecter
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Connecter
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password/:token" element={<PasswordReset/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/admin/tables" element={<TablesAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
