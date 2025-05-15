import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar, PageNotFound, Sidebar } from "./components";
import {
  AssetInfo,
  AssetList,
  ConsumableList,
  Dashbaord,
  DisposalHistory,
  IssueHistory,
  LoginPage,
  NewAsset,
  NewConsumable,
  NewRequest,
  NewTransit,
  Password,
  Profile,
  Requests,
  TransfersHistory,
  TransitRequests,
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
                        <Route path="/dashboard" element={<Dashbaord />} />
                        <Route path="/assets" element={<AssetList />} />
                        <Route path="/assets/new" element={<NewAsset />} />
                        <Route path="/assets/:id" element={<AssetInfo />} />
                        <Route
                          path="/consumables"
                          element={<ConsumableList />}
                        />
                        <Route
                          path="/consumables/new"
                          element={<NewConsumable />}
                        />
                        <Route
                          path="/disposals"
                          element={<DisposalHistory />}
                        />
                        <Route path="/issuances" element={<IssueHistory />} />
                        <Route
                          path="/transfers"
                          element={<TransfersHistory />}
                        />
                        <Route path="/requests" element={<Requests />} />
                        <Route path="/requests/new" element={<NewRequest />} />
                        <Route path="/transits" element={<TransitRequests />} />
                        <Route path="/transits/new" element={<NewTransit />} />
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
