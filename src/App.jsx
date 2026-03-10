import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScienceTechnology from "./pages/ScienceTechnology";
import DashboardPage from "./pages/DashboardPage";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import CreditPage from "./components/CreditPage";
import BranchesOfScience from "./pages/BranchesOfScience";
import SubtopicsPage from "./pages/SubtopicsPage";
import TopicDetailPage from "./pages/TopicDetailPage";
import DataTablePage from "./pages/DataTablePage";
import InfoPage from "./pages/InfoPage";
import ViewDocumentPage from "./pages/ViewDocumentPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <BrowserRouter
    // basename="/sciencetechnology"
    >
      <Routes>
        <Route path="/" element={<ScienceTechnology />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/credit" element={<CreditPage />} />
        <Route path="/branches-of-science" element={<BranchesOfScience />} />
        <Route
          path="/branches-of-science/:branch"
          element={<SubtopicsPage />}
        />
        <Route
          path="/branches-of-science/:branch/:topic"
          element={<TopicDetailPage />}
        />
        <Route
          path="/branches-of-science/:branch/:topic/:type"
          element={<DataTablePage />}
        />
        <Route
          path="/branches-of-science/:branch/:topic/:type/:id"
          element={<InfoPage />}
        />
        <Route
          path="/branches-of-science/:branch/:topic/:type/:id/view"
          element={<ViewDocumentPage />}
        />
        <Route path="/branches-of-science/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
