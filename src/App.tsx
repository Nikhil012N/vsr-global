import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import DashboardPage from "@/pages/dashboard";
import FilesPage from "@/pages/search-files";
import NewFilePage from "@/pages/open-files";
import RootLayout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/search-files" element={<FilesPage />} />
          <Route path="/open-files" element={<NewFilePage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
