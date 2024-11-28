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
import AddNewBookPage from "./pages/AddNewNotePage";
import FooterBar from "./components/FooterBar";
import AddNewNotePage from "./pages/AddNewNotePage";
import ListNotesPage from "./pages/ListNotesPage";
import NoteDetailsPage from "./pages/NoteDetailsPage";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/add-library" element={<CreateNewLibraryPage />} />
            <Route
              path="/my-library/:idLibrary"
              element={<LibraryDetailsPage />}
            />
            <Route path="/books" element={<ListBooksPage />} />
            <Route path="/books/:bookId" element={<BookDetailsPage />} />
            <Route path="/notes/:noteId" element={<NoteDetailsPage />} />
            <Route path="/books/add-new" element={<AddNewBookPage />} />
            <Route path="/notes/add-new" element={<AddNewNotePage />} />
            <Route path="/notes/" element={<ListNotesPage />} />
          </Routes>
        </div>
        <FooterBar />
      </div>
    </>
  );
}

export default App;
