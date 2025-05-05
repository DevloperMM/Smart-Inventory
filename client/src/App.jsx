import { React } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import {
  AssetList,
  ConsumableList,
  CRD,
  DisposalHistory,
  HRD,
  IssueHistory,
  Requests,
  TransfersHistory,
  Welcome,
} from "./pages";

function App() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-4 bg-gray-100">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/dashboard/hrd" element={<HRD />} />
            <Route path="/dashboard/crd" element={<CRD />} />
            <Route path="/assets" element={<AssetList />} />
            <Route path="/consumables" element={<ConsumableList />} />
            <Route
              path="/transaction/disposals"
              element={<DisposalHistory />}
            />
            <Route path="/transaction/issuances" element={<IssueHistory />} />
            <Route
              path="/transaction/transfers"
              element={<TransfersHistory />}
            />
            <Route path="/transaction/requests" element={<Requests />} />
          </Routes>
        </main>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
