import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar, PageNotFound, Sidebar } from "./components";
import {
  AssetInfo,
  AssetList,
  ConsumableList,
  Dashbaord,
  DisposalHistory,
  EditAsset,
  EditConsumable,
  IssueHistory,
  LoginPage,
  NewAsset,
  NewConsumable,
  NewDisposal,
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
                <div className="flex h-screen font-[Inter]">
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

                        {/* Assets */}
                        <Route path="/assets" element={<AssetList />} />
                        <Route path="/assets/new" element={<NewAsset />} />
                        <Route
                          path="/assets/edit/:id"
                          element={<EditAsset />}
                        />
                        <Route path="/assets/:id" element={<AssetInfo />} />

                        {/* Consumables */}
                        <Route
                          path="/consumables"
                          element={<ConsumableList />}
                        />
                        <Route
                          path="/consumables/new"
                          element={<NewConsumable />}
                        />
                        <Route
                          path="/consumables/edit/:id"
                          element={<EditConsumable />}
                        />

                        {/* Transactions */}
                        <Route
                          path="/transactions/disposals"
                          element={<DisposalHistory />}
                        />
                        <Route
                          path="/transactions/disposals/new"
                          element={<NewDisposal />}
                        />
                        <Route
                          path="/transactions/issuances"
                          element={<IssueHistory />}
                        />
                        <Route
                          path="/transactions/transfers"
                          element={<TransfersHistory />}
                        />
                        <Route
                          path="/transactions/requests"
                          element={<Requests />}
                        />
                        <Route
                          path="/transactions/requests/new"
                          element={<NewRequest />}
                        />
                        <Route
                          path="/transactions/transits"
                          element={<TransitRequests />}
                        />
                        <Route
                          path="/transactions/transits/new"
                          element={<NewTransit />}
                        />

                        {/* User */}
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
