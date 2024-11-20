import "./App.css";
// import { Button } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
