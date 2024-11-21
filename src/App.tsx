import "./App.css";
// import { Button } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </>
  );
}

export default App;
