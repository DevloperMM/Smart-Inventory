import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar, PageNotFound, Sidebar } from "./components";
import {
  AssetInfo,
  AssetList,
  ConsumableList,
  CRD,
  DisposalHistory,
  HRD,
  IssueHistory,
  LoginPage,
  NewAsset,
  Password,
  Profile,
  Requests,
  TransfersHistory,
  Welcome,
} from "./pages";

function App() {
  const authUser = true;

  return (
    <>
      <Toaster />
      <Routes>
        {authUser ? (
          <>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route
              path="*"
              element={
                <div className="flex h-screen font-[Verdana]">
                  <div className="fixed inset-y-0 left-0 w-56 z-20">
                    <Sidebar />
                  </div>
                  <div className="flex-1 flex flex-col ml-56">
                    <div className="sticky top-0 z-10">
                      <Navbar />
                    </div>
                    <main className="flex-1 p-4 overflow-x-auto bg-gray-100">
                      <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/dashboard/hrd" element={<HRD />} />
                        <Route path="/dashboard/crd" element={<CRD />} />
                        <Route path="/assets" element={<AssetList />} />
                        <Route path="/assets/new" element={<NewAsset />} />
                        <Route path="/assets/:id" element={<AssetInfo />} />
                        <Route
                          path="/consumables"
                          element={<ConsumableList />}
                        />
                        <Route
                          path="/transaction/disposals"
                          element={<DisposalHistory />}
                        />
                        <Route
                          path="/transaction/issuances"
                          element={<IssueHistory />}
                        />
                        <Route
                          path="/transaction/transfers"
                          element={<TransfersHistory />}
                        />
                        <Route
                          path="/transaction/requests"
                          element={<Requests />}
                        />
                        <Route path="/user/profile" element={<Profile />} />
                        <Route path="/user/password" element={<Password />} />
                        <Route path="*" element={<PageNotFound />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              }
            />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
