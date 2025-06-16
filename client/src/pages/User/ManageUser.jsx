import { Eye, Pencil, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageFooter } from "../../components";

const initialState = {
  name: "",
  email: "",
  empCode: "",
  department: "",
  role: "",
  storeManaging: "",
};

const users = [
  {
    id: 1,
    name: "Admin Developer",
    email: "admin@xyz.com",
    empCode: "45789",
    department: "IT",
    role: "admin",
    storeManaging: 0,
    profileCreatedOn: "2025-05-21T12:36:20.430Z",
    profileCreatedBy: 1,
    profileUpdatedOn: null,
    profileUpdatedBy: null,
    deletedAt: null,
  },
  {
    id: 2,
    name: "Bhim",
    email: "bhim@xyz.com",
    empCode: "12475",
    department: "IT",
    role: "it-head",
    storeManaging: 0,
    profileCreatedOn: "2025-05-21T12:36:20.430Z",
    profileCreatedBy: 1,
    profileUpdatedOn: null,
    profileUpdatedBy: null,
    deletedAt: null,
  },
  {
    id: 3,
    name: "Rahul",
    email: "rahul@xyz.com",
    empCode: "69712",
    department: "IT",
    role: "user",
    storeManaging: 0,
    profileCreatedOn: "2025-05-21T12:36:20.430Z",
    profileCreatedBy: 1,
    profileUpdatedOn: null,
    profileUpdatedBy: null,
    deletedAt: null,
  },
  {
    id: 4,
    name: "Alberto",
    email: "alberto@xyz.com",
    empCode: "74859",
    department: "IT",
    role: "user",
    storeManaging: 0,
    profileCreatedOn: "2025-05-21T12:36:20.430Z",
    profileCreatedBy: 1,
    profileUpdatedOn: null,
    profileUpdatedBy: null,
    deletedAt: null,
  },
  {
    id: 5,
    name: "Srinivas",
    email: "sri@xyz.com",
    empCode: "14569",
    department: "IT",
    role: "user",
    storeManaging: 0,
    profileCreatedOn: "2025-05-21T12:36:20.430Z",
    profileCreatedBy: 1,
    profileUpdatedOn: null,
    profileUpdatedBy: null,
    deletedAt: null,
  },
  {
    id: 6,
    name: "Vijay",
    email: "vijay@xyz.com",
    empCode: "84267",
    department: "IT",
    role: "store-manager",
    storeManaging: 1,
    profileCreatedOn: "2025-05-21T12:36:20.430Z",
    profileCreatedBy: 1,
    profileUpdatedOn: null,
    profileUpdatedBy: null,
    deletedAt: null,
  },
  {
    id: 7,
    name: "Rathore",
    email: "rathore@xyz.com",
    empCode: "30587",
    department: "IT",
    role: "store-manager",
    storeManaging: 2,
    profileCreatedOn: "2025-05-21T12:36:20.430Z",
    profileCreatedBy: 1,
    profileUpdatedOn: null,
    profileUpdatedBy: null,
    deletedAt: null,
  },
];

export default function ManageUser() {
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [filterData, setFilterData] = useState(initialState);

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
  }, [filterData]);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <button className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer">
          <Plus className="inline-block size-5 mb-1 mr-1" /> Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-auto">
        <table className="max-w-screen text-sm border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[5%] border px-3 py-2 text-center">#</th>
              <th className="w-[17.5%] border px-3 py-2">Name</th>
              <th className="w-[25%] border px-3 py-2">Email</th>
              <th className="w-[11.5] border px-3 py-2">EmpCode</th>
              <th className="w-[11%] border px-3 py-2">Department</th>
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
            {pageData.map((user, i) => (
              <tr
                key={i + 1}
                className={`h-12 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="border px-3 py-2 text-center">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">{user.name}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className="border px-3 py-2">{user.empCode}</td>
                <td className="border px-3 py-2">{user.department}</td>
                <td className="border px-3 py-2">{user.role.toUpperCase()}</td>
                <td className="border px-3 py-2">
                  {user.storeManaging > 0 ? (
                    <span>{user.storeManaging === 1 ? "HRD" : "CRD"}</span>
                  ) : (
                    <span></span>
                  )}
                </td>
                <td className="border px-3 py-2">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                      className="text-gray-600 hover:text-black"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                      className="text-gray-600 hover:text-black"
                    >
                      <Pencil size={18} />
                    </button>
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
    </div>
  );
}
