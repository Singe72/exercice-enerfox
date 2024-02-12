import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}