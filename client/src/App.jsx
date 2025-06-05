import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AdminLayout, Loader, PageNotFound, UserLayout } from "./components";
import {
  AssetInfo,
  AssetList,
  ConsumableList,
  AdminPage,
  UserPage,
  DisposalHistory,
  EditAsset,
  IssueHistory,
  LoginPage,
  NewAsset,
  NewConsumable,
  NewDisposal,
  NewRequest,
  NewTransit,
  PasswordPage,
  ProfilePage,
  Requests,
  TransfersHistory,
  TransitRequests,
  WelcomePage,
} from "./pages";
import { useUserStore } from "./store/useUserStore.js";
import { useEffect } from "react";

function App() {
  const { checkAuth, checkingAuth, user } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <Loader />;

  return (
    <>
      <Toaster />
      <Routes>
        {user ? (
          <>
            <Route path="/login" element={<Navigate to="/" replace />} />

            <Route
              path="/"
              element={
                user?.role ? (
                  <Navigate
                    to={user.role === "user" ? "/user" : "/admin"}
                    replace
                  />
                ) : null
              }
            />

            <Route path="/user" element={<UserLayout />}>
              <Route index element={<UserPage />} />
              <Route
                path="*"
                element={
                  <div className="flex-1 flex items-center justify-center p-4 min-h-screen overflow-x-auto bg-gray-500/10">
                    <PageNotFound />
                  </div>
                }
              />
            </Route>

            {["admin", "store-manager", "it-head"].includes(user.role) && (
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<WelcomePage />} />
                <Route path="dashboard" element={<AdminPage />} />

                <Route path="assets" element={<AssetList />} />
                <Route path="assets/new" element={<NewAsset />} />
                <Route path="assets/edit/:id" element={<EditAsset />} />
                <Route path="assets/:id" element={<AssetInfo />} />

                <Route path="consumables" element={<ConsumableList />} />
                <Route path="consumables/new" element={<NewConsumable />} />

                <Route
                  path="transactions/disposals"
                  element={<DisposalHistory />}
                />
                <Route
                  path="transactions/disposals/new"
                  element={<NewDisposal />}
                />
                <Route
                  path="transactions/issuances"
                  element={<IssueHistory />}
                />
                <Route
                  path="transactions/transfers"
                  element={<TransfersHistory />}
                />
                <Route path="transactions/requests" element={<Requests />} />
                <Route
                  path="transactions/requests/new"
                  element={<NewRequest />}
                />
                <Route
                  path="transactions/transits"
                  element={<TransitRequests />}
                />
                <Route
                  path="transactions/transits/new"
                  element={<NewTransit />}
                />

                <Route path="profile" element={<ProfilePage />} />
                <Route path="password" element={<PasswordPage />} />

                <Route path="*" element={<PageNotFound />} />
              </Route>
            )}

            <Route
              path="*"
              element={
                <div className="flex-1 flex items-center justify-center p-4 min-h-screen overflow-x-auto bg-gray-500/10">
                  <PageNotFound />
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
