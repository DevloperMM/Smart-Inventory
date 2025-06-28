import { Routes, Route, Navigate } from "react-router-dom";
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
  NewTransit,
  PasswordPage,
  ProfilePage,
  Requests,
  TransfersHistory,
  WelcomePage,
  UserRequests,
  NewUserRequest,
  UserIssuances,
  UserProfile,
  UserPassword,
  NewAssetDispose,
  NewConsumableDispose,
  ManageUser,
  TransitsList,
  TransferOptions,
} from "./pages";
import { useAssetStore, useConsumableStore, useUserStore } from "./store";
import { useEffect } from "react";

function App() {
  const { checkAuth, checkingAuth, user } = useUserStore();
  const { getConsumablesCats } = useConsumableStore();
  const { getAssetsCats } = useAssetStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getConsumablesCats();
  }, [getConsumablesCats]);

  useEffect(() => {
    getAssetsCats();
  }, [getAssetsCats]);

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
              <Route path="requests" element={<UserRequests />} />
              <Route path="request/new" element={<NewUserRequest />} />
              <Route path="issuances" element={<UserIssuances />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="password" element={<UserPassword />} />
              <Route
                path="*"
                element={
                  <div className="flex-1 flex items-center justify-center p-4 min-h-screen overflow-x-auto bg-gray-500/10">
                    <PageNotFound homeLink={"/user"} />
                  </div>
                }
              />
            </Route>

            {["admin", "store-manager", "it-head"].includes(user.role) && (
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<WelcomePage />} />
                <Route path="dashboard" element={<AdminPage />} />
                <Route path="users" element={<ManageUser />} />

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
                  path="transactions/disposals/asset/new"
                  element={<NewAssetDispose />}
                />
                <Route
                  path="transactions/disposals/consumable/new"
                  element={<NewConsumableDispose />}
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
                  path="transactions/transits"
                  element={<TransitsList />}
                />
                <Route
                  path="transactions/transits/new"
                  element={<NewTransit />}
                />
                <Route
                  path="transactions/transits/:id"
                  element={<TransferOptions />}
                />

                <Route path="profile" element={<ProfilePage />} />
                <Route path="password" element={<PasswordPage />} />

                <Route
                  path="*"
                  element={<PageNotFound homeLink={"/admin"} />}
                />
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
