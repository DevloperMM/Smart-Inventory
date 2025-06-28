import { useEffect, useMemo, useState } from "react";
import { Check, Eye, X } from "lucide-react";
import { statusColors } from "../../../lib/constants.js";
import { PageFooter, Modal, LoadRecords, LoadIcon } from "../../../components";
import { format } from "date-fns";
import { useRequestStore, useUserStore } from "../../../store";

const initialState = {
  category: "",
  requester: "",
  createdAt: "",
  status: "",
  decider: "",
  storeId: "",
};

const RequestsList = ({ setStep }) => {
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [show, setShow] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState({});
  const [filterData, setFilterData] = useState(initialState);

  const [issueModal, setIssueModal] = useState(false);
  const [approve, setApprove] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const { user } = useUserStore();
  const {
    fetchingRequests,
    getAllRequests,
    requests,
    loading,
    decideAssetRequest,
    decideConsumableRequest,
    setRequest,
  } = useRequestStore();

  useEffect(() => {
    setRequest(null);
    getAllRequests();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    let data = requests
      .filter((request) =>
        Object.entries(filterData).every(([key, value]) => {
          let search = request[key];

          if (!value) return true;

          if (key === "storeId") return request.storeId === Number(value);
          if (["requester", "decider"].includes(key))
            search = request[key]?.name;
          if (key === "createdAt") {
            const createdDate = format(
              new Date(request.createdAt),
              "dd-MM-yyyy"
            );
            const valueDate = format(new Date(value), "dd-MM-yyyy");
            return createdDate === valueDate;
          }

          return search?.toLowerCase().includes(value.trim().toLowerCase());
        })
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });

    return data;
  }, [filterData, requests]);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedRequest.itemType === "consumable")
      decideConsumableRequest(
        selectedRequest.id,
        approve ? "approved" : "rejected",
        inputValue
      );
    else
      decideAssetRequest(
        selectedRequest.id,
        approve ? "approved" : "rejected",
        inputValue
      );

    setInputValue("");
    setApprove(null);
    setSelectedRequest(null);
    setIssueModal(false);
  };

  if (fetchingRequests) return <LoadRecords />;

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      <h2 className="text-2xl font-bold">Requests List</h2>

      {/* Requests Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[5%] border px-3 py-2 text-center">#</th>
              <th className="w-[15%] border px-3 py-2">Category</th>
              <th className="w-[17.5%] border px-3 py-2">Requested By</th>
              <th className="w-[10%] border px-3 py-2">Requested On</th>
              <th className="w-[10%] border px-3 py-2">Status</th>
              <th className="w-[17.5%] border px-3 py-2">Decided by</th>
              <th className="w-[10%] border px-3 py-2">Store</th>
              <th className="w-[5%] border px-3 py-2 text-center">Info</th>
              <th className="w-[10%] border px-3 py-2 text-center">Actions</th>
            </tr>
            <tr className="bg-white h-fit">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.category}
                  onChange={(e) =>
                    setFilterData({ ...filterData, category: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.requester}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      requester: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.createdAt}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      createdAt: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border p-2">
                <select
                  className="w-full border p-1 rounded"
                  value={filterData.status}
                  onChange={(e) =>
                    setFilterData({ ...filterData, status: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Approved">Approved</option>
                  <option value="Issued">Issued</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.decider}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      decider: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border p-2">
                <select
                  className="w-full border p-1 rounded"
                  value={filterData.storeId}
                  onChange={(e) =>
                    setFilterData({ ...filterData, storeId: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value={1}>HRD</option>
                  <option value={2}>CRD</option>
                </select>
              </td>
              <td className="border p-2" />
              <td className="border p-2" />
            </tr>
          </thead>
          <tbody>
            {pageData.map((request, i) => (
              <tr
                key={request.id}
                className={i % 2 === 0 ? "bg-white h-12" : "bg-gray-50 h-12"}
              >
                <td className="border px-3 py-2 text-center">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">{request.category}</td>
                <td className="border px-3 py-2">{request.requester.name}</td>
                <td className="border px-3 py-2">
                  {format(request.createdAt, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      statusColors[request.status]
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="border px-3 py-2">{request.decider?.name}</td>
                <td className="border px-3 py-2">
                  {request.storeId === 1 ? "HRD" : "CRD"}
                </td>
                <td className="border px-3 py-2 text-center">
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => {
                      setSelectedRequest(request);
                      setShow(true);
                    }}
                  >
                    <Eye size={20} className="inline-block pb-0.5 mr-1.5" />
                  </span>
                </td>
                <td className="border px-4 py-2 text-center">
                  {request.status === "pending" &&
                  (user.storeManaging === 0 ||
                    (user.storeManaging > 0 &&
                      user.storeManaging === request.storeId &&
                      request.itemType === "consumable")) ? (
                    <div className="flex justify-between">
                      <button
                        className="bg-green-500 px-2 py-1.5 rounded-xl text-white hover:bg-green-600 disabled:bg-gray-400"
                        onClick={() => {
                          setApprove(true);
                          setIssueModal(true);
                          setSelectedRequest(request);
                        }}
                      >
                        <Check strokeWidth={2} size={22} />
                      </button>
                      <button
                        className="bg-red-400 px-2 py-1.5 rounded-xl text-white hover:bg-red-500 disabled:bg-gray-400"
                        onClick={() => {
                          setApprove(false);
                          setIssueModal(true);
                          setSelectedRequest(request);
                        }}
                      >
                        <X strokeWidth={2} size={22} />
                      </button>
                    </div>
                  ) : ["approved", "pending"].includes(request.status) &&
                    (user.storeManaging === 0 ||
                      user.storeManaging === request.storeId) ? (
                    <button
                      disabled={request.status !== "approved"}
                      onClick={() => {
                        setRequest(request);
                        setStep(2);
                      }}
                      className="w-full bg-teal-500 px-1 py-1.5 text-base rounded-xl text-white hover:bg-teal-600 disabled:bg-gray-400"
                    >
                      <span>Issue</span>
                    </button>
                  ) : request.status === "issued" ? (
                    <div className="inline-block w-full bg-blue-100 text-black text-sm font-semibold px-1 py-1.5 rounded-xl border-2 border-blue-500 shadow-md relative">
                      <span className="block text-center tracking-wide">
                        Issued
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!msg ? (
        <PageFooter
          rows={rows}
          page={page}
          setPage={setPage}
          setRows={setRows}
          totalPages={totalPages}
        />
      ) : (
        <div className="text-center mt-4 text-red-500">{msg}</div>
      )}

      {show && (
        <Modal
          show={show}
          onClose={() => setShow(false)}
          data={{
            "Request Purpose": selectedRequest.purpose,
            Decision: selectedRequest?.decisionInfo || "",
          }}
        />
      )}

      {issueModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-md space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Decision</h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="decisionStatus" className="w-1/4">
                Status
              </label>
              <input
                id="decisionStatus"
                type="text"
                className="w-3/4 border rounded p-1 font-bold"
                value={approve ? "Approved" : "Rejected"}
                disabled
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="comments" className="w-1/4">
                Comments<span className="text-red-500 align-top">*</span>
              </label>
              <textarea
                id="comments"
                name="comments"
                rows={4}
                className="w-3/4 border rounded p-1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                placeholder="Add your remarks..."
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                onClick={() => {
                  setApprove(null);
                  setSelectedRequest(null);
                  setIssueModal(false);
                }}
              >
                Cancel
              </button>
              {loading ? (
                <LoadIcon />
              ) : (
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                >
                  Decide
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RequestsList;
