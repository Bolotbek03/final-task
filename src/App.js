import React from "react";
import MainRoutes from "./Routes/MainRoutes.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
const App = () => {
  return (
    <div>
      <Navbar />
      <MainRoutes />
    </div>
  );
};

export default App;
