
// // import React, { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import imagehero from "../assets/PLAN122.png";
// // import CircularProgress from '@mui/material/CircularProgress';
// // import Box from '@mui/material/Box';
// // import Typography from '@mui/material/Typography';
// // import { useSelector } from "react-redux";

// // const Home = () => {
// //   const navigate = useNavigate();
// //   const { user: currentUser } = useSelector((state) => state.auth);

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       if (currentUser && currentUser.roles.includes("ROLE_ADMIN")) {
// //         navigate("/admin");
// //       } else {
// //         navigate("/login");
// //       }
// //     }, 3000); // Redirection après 3 secondes

// //     return () => clearTimeout(timer);
// //   }, [navigate, currentUser]);

// //   return (
// //     <Box
// //       sx={{
// //         display: 'flex',
// //         flexDirection: 'column',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         height: '100vh',
// //         textAlign: 'center',
// //         backgroundColor: '#f0f0f0',
// //       }}
// //     >
// //       <img
// //         src={imagehero}
// //         alt="Company Logo"
// //         style={{ height: '120px', width: 'auto', marginBottom: '20px' }}
// //       />
// //       <Typography variant="h4" component="h1" sx={{ mb: 4 , mt:4, color:"#a97a45"}}>
// //         Welcome to the Dashboard
// //       </Typography>
// //       <CircularProgress />
// //     </Box>
// //   );
// // };

// // export default Home;


// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import imagehero from "../assets/PLAN122.png";
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { useSelector } from "react-redux";

// const Home = () => {
//   const navigate = useNavigate();
//   const { user: currentUser } = useSelector((state) => state.auth);
//   const { isAllowed } = useSelector((state) => state.auth);  // Vérifie l'état isAllowed

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (currentUser && currentUser.roles.includes("ROLE_ADMIN")) {
//         navigate("/admin");
//       } else if (currentUser && !isAllowed) {
//         navigate("/");  // Reste sur la même page (et App.js gérera l'affichage de "Not Allowed")
//       } else {
//         navigate("/login");
//       }
//     }, 3000); // Redirection après 3 secondes

//     return () => clearTimeout(timer);
//   }, [navigate, currentUser, isAllowed]);

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         textAlign: 'center',
//         backgroundColor: '#f0f0f0',
//       }}
//     >
//       <img
//         src={imagehero}
//         alt="Company Logo"
//         style={{ height: '120px', width: 'auto', marginBottom: '20px' }}
//       />
//       <Typography variant="h4" component="h1" sx={{ mb: 4 , mt:4, color:"#a97a45"}}>
//         Welcome to the Dashboard
//       </Typography>
//       <CircularProgress />
//     </Box>
//   );
// };

// export default Home;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imagehero from "../assets/PLAN122.png";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isAllowed } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentUser && currentUser.roles.includes("ROLE_ADMIN")) {
        navigate("/admin");
      } else if (currentUser && !isAllowed) {
        navigate("/admin");  // Déclenche la logique "Not Allowed" dans `App.js`
      } else {
        navigate("/login");
      }
    }, 3000); // Redirection après 3 secondes

    return () => clearTimeout(timer);
  }, [navigate, currentUser, isAllowed]);

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
      <img
        src={imagehero}
        alt="Company Logo"
        style={{ height: '120px', width: 'auto', marginBottom: '20px' }}
      />
      <Typography variant="h4" component="h1" sx={{ mb: 4 , mt:4, color:"#a97a45"}}>
        Welcome to the Dashboard .
      </Typography>
      <CircularProgress />
    </Box>
  );
};

export default Home;
