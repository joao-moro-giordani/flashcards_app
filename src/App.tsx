import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import { FoldersPage } from "./pages/FoldersPage";
import { DeckDetailsPage } from "./pages/DeckDetailsPage";
import { FolderDetailsPage } from "./pages/FolderDetailsPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/folders" />} />

          <Route path="/folders" element={<FoldersPage />} />
          <Route path="/folders/:id" element={<FolderDetailsPage />} />
          <Route path="/decks/:id" element={<DeckDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;