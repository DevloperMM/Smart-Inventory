import { Eye, Pencil, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LoadRecords, PageFooter, UserModal } from "../../components";
import { useUserStore } from "../../store";

const initialState = {
  name: "",
  email: "",
  empCode: "",
  department: "",
  extension: "",
  role: "",
  storeManaging: "",
};

export default function ManageUser() {
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [filterData, setFilterData] = useState(initialState);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");
  const [selectedUser, setSelectedUser] = useState(initialState);

  const { user, users, loadingUsers, getAllUsers } = useUserStore();

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    let data = users.filter((item) =>
      Object.entries(filterData).every(([key, value]) => {
        if (!value) return true;
        if (key === "storeManaging") return item[key] === parseInt(value);
        return item[key]?.toLowerCase().includes(value.trim().toLowerCase());
      })
    );

    return data;
  }, [filterData, users]);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  if (loadingUsers) return <LoadRecords />;

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        {user.storeManaging === 0 && (
          <button
            onClick={() => {
              setSelectedUser(initialState);
              setMode("add");
              setShow(true);
            }}
            className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
          >
            <Plus className="inline-block size-5 mb-1 mr-1" /> Add User
          </button>
        )}
      </div>

      {/* Users Table */}
      <div className="overflow-auto">
        <table className="max-w-screen text-sm border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[5%] border px-3 py-2 text-center">#</th>
              <th className="w-[16%] border px-3 py-2">Name</th>
              <th className="w-[25%] border px-3 py-2">Email</th>
              <th className="w-[11] border px-3 py-2">EmpCode</th>
              <th className="w-[10%] border px-3 py-2">Department</th>
              <th className="w-[3%] border px-3 py-2">Extension</th>
              <th className="w-[15%] border px-3 py-2">Role</th>
              <th className="w-[10%] border px-3 py-2">Managing</th>
              <th className="w-[5%] border px-3 py-2 text-center">Actions</th>
            </tr>
            <tr className="bg-white h-fit">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.name}
                  onChange={(e) =>
                    setFilterData({ ...filterData, name: e.target.value })
                  }
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.email}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      email: e.target.value,
                    })
                  }
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.empCode}
                  onChange={(e) =>
                    setFilterData({ ...filterData, empCode: e.target.value })
                  }
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.department}
                  onChange={(e) =>
                    setFilterData({ ...filterData, department: e.target.value })
                  }
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.extension}
                  onChange={(e) =>
                    setFilterData({ ...filterData, extension: e.target.value })
                  }
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={filterData.role}
                  onChange={(e) =>
                    setFilterData({ ...filterData, role: e.target.value })
                  }
                  className="w-full border p-1 rounded"
                >
                  <option value="">Select</option>
                  <option value="admin">Admin</option>
                  <option value="it-head">IT Head</option>
                  <option value="store-manager">Store Manager</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td className="border p-2">
                <select
                  value={filterData.storeManaging}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      storeManaging: e.target.value,
                    })
                  }
                  className="w-full border p-1 rounded"
                >
                  <option value="">Select</option>
                  <option value={1}>HRD</option>
                  <option value={2}>CRD</option>
                </select>
              </td>
              <td className="border p-2" />
            </tr>
          </thead>
          <tbody>
            {pageData.map((item, i) => (
              <tr
                key={i + 1}
                className={`h-12 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="border px-3 py-2 text-center">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">{item.name}</td>
                <td className="border px-3 py-2">{item.email}</td>
                <td className="border px-3 py-2">{item.empCode}</td>
                <td className="border px-3 py-2">{item.department}</td>
                <td className="border px-3 py-2">{item.extension}</td>
                <td className="border px-3 py-2">{item.role.toUpperCase()}</td>
                <td className="border px-3 py-2">
                  {item.storeManaging > 0 ? (
                    <span>{item.storeManaging === 1 ? "HRD" : "CRD"}</span>
                  ) : (
                    <span></span>
                  )}
                </td>
                <td className="border px-3 py-2">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => {
                        setMode("view");
                        setShow(true);
                        setSelectedUser(item);
                      }}
                      className="text-gray-600 hover:text-black"
                    >
                      <Eye size={20} />
                    </button>
                    {user.storeManaging === 0 && (
                      <button
                        onClick={() => {
                          setMode("edit");
                          setShow(true);
                          setSelectedUser(item);
                        }}
                        className="text-gray-600 hover:text-black"
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {msg && <div className="text-center mt-4 text-red-500">{msg}</div>}

      {/* Pagination */}
      {!msg && (
        <PageFooter
          rows={rows}
          page={page}
          setRows={setRows}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}

      {show && (
        <UserModal
          show={show}
          onClose={() => setShow(false)}
          user={selectedUser}
          setUser={setSelectedUser}
          mode={mode}
          setUserEmpty={() => setSelectedUser(initialState)}
        />
      )}
    </div>
  );
}
