import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import ListPage from "./pages/ListPage";
import GalleryPage from "./pages/GalleryPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/pokemon/:id" element={<DetailPage />} />
        <Route path="*" element={<p>Page not found.</p>} />
      </Routes>
    </>
  );
}

export default App;