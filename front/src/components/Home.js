// import React, { useState, useEffect } from "react";

// import UserService from "../services/user.service";

// const Home = () => {
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     UserService.getPublicContent().then(
//       (response) => {
//         setContent(response.data);
//       },
//       (error) => {
//         const _content =
//           (error.response && error.response.data) ||
//           error.message ||
//           error.toString();

//         setContent(_content);
//       }
//     );
//   }, []);

//   return (
//     <div className="container">
//       <header className="jumbotron">
//         <h3>{content}</h3>
//       </header>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imagehero from "../assets/PLAN122.png";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/admin");
    }, 3000); // Redirection après 6 secondes

    return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté avant la fin du délai
  }, [navigate]);

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
        Welcome to the Dashboard
      </Typography>
      <CircularProgress />
    </Box>
  );
};

export default Home;
