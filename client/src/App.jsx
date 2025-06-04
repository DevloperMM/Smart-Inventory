import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  AdminLayout,
  Loader,
  PageNotFound,
  ProtectRole,
  RoleRedirect,
  UserLayout,
} from "./components";
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

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <Loader />;

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />

        <Route path="/" element={<RoleRedirect />} />

        <Route
          path="/user"
          element={
            <ProtectRole
              allowedRoles={["admin", "it-head", "store-manager", "user"]}
            >
              <UserLayout />
            </ProtectRole>
          }
        >
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

        <Route
          path="/admin"
          element={
            <ProtectRole allowedRoles={["admin", "it-head", "store-manager"]}>
              <AdminLayout />
            </ProtectRole>
          }
        >
          <Route index element={<WelcomePage />} />
          <Route path="dashboard" element={<AdminPage />} />

          <Route path="assets" element={<AssetList />} />
          <Route path="assets/new" element={<NewAsset />} />
          <Route path="assets/edit/:id" element={<EditAsset />} />
          <Route path="assets/:id" element={<AssetInfo />} />

          <Route path="consumables" element={<ConsumableList />} />
          <Route path="consumables/new" element={<NewConsumable />} />

          <Route path="transactions/disposals" element={<DisposalHistory />} />
          <Route path="transactions/disposals/new" element={<NewDisposal />} />
          <Route path="transactions/issuances" element={<IssueHistory />} />
          <Route path="transactions/transfers" element={<TransfersHistory />} />
          <Route path="transactions/requests" element={<Requests />} />
          <Route path="transactions/requests/new" element={<NewRequest />} />
          <Route path="transactions/transits" element={<TransitRequests />} />
          <Route path="transactions/transits/new" element={<NewTransit />} />

          <Route path="profile" element={<ProfilePage />} />
          <Route path="password" element={<PasswordPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route path="*" element={<RoleRedirect />} />
      </Routes>
    </>
  );
}

export default App;
