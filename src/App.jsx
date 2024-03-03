import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import { Navbar, Footer } from "./components";
import { HomePage, ExerciseDetailPage } from "./pages";

function App() {
  return (
    <Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercise/:id" element={<ExerciseDetailPage />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
