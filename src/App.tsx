import "./App.css";
// import { Button } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CreateNewLibraryPage from "./pages/CreateNewLibraryPage";
import LibraryDetailsPage from "./pages/LibraryDetailsPage";
import ListBooksPage from "./pages/ListBooksPage";
import BookDetailsPage from "./pages/BookDetailsPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/add-library" element={<CreateNewLibraryPage />} />
        <Route path="/my-library/:id" element={<LibraryDetailsPage />} />
        <Route path="/books" element={<ListBooksPage />} />
        <Route path="/books/:bookId" element={<BookDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
