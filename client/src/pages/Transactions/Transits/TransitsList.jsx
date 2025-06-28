import { useState, useMemo, useEffect } from "react";
import { Check, Eye, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { statusColors } from "../../../lib/constants";
import { format } from "date-fns";
import { PageFooter, Modal, LoadIcon, LoadRecords } from "../../../components";
import { useTransitStore, useUserStore } from "../../../store";
import toast from "react-hot-toast";

const initialState = {
  createdAt: "",
  updatedAt: "",
  fromStore: "",
  toStore: "",
  status: "",
};

const TransitsList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  const [filterData, setFilterData] = useState(initialState);
  const [selectedTransit, setSelectedTransit] = useState({});

  const [transitModal, setTransitModal] = useState(false);
  const [approve, setApprove] = useState(null);
  const [accept, setAccept] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const { user } = useUserStore();
  const {
    transits,
    getTransits,
    loading,
    decideTransit,
    validateTransit,
    fetchingTransits,
  } = useTransitStore();

  useEffect(() => {
    getTransits();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    let data = transits
      .filter((transit) =>
        Object.entries(filterData).every(([key, value]) => {
          if (!value) return true;
          if (key === "createdAt" || key === "updatedAt")
            return transit.createdAt === value;
          if (key === "fromStore" || key === "toStore")
            return transit[key] === parseInt(value);

          return transit[key]
            ?.toLowerCase()
            .includes(value.trim().toLowerCase());
        })
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateA - dateB;
      });

    return data;
  }, [filterData, transits]);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        user.storeManaging > 0 &&
        selectedTransit.fromStore === user.storeManaging
      ) {
        await validateTransit(
          selectedTransit.id,
          accept ? "accepted" : "declined",
          inputValue
        );
      } else if (user.storeManaging === 0) {
        await decideTransit(
          selectedTransit.id,
          approve ? "approved" : "rejected",
          inputValue
        );
      }

      setInputValue("");
      setAccept(null);
      setApprove(null);
      setSelectedTransit(null);
      setTransitModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Error submitting transit decision");
    }
  };

  if (fetchingTransits) return <LoadRecords />;

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transits List</h2>
        <button
          onClick={() => navigate("/admin/transactions/transits/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" />
          Create Transit
        </button>
      </div>

      {/* Requests Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[4%] border px-3 py-2 text-center">#</th>
              <th className="w-[24%] border px-3 py-2">
                <div className="flex justify-between px-1">
                  <span>Category</span>
                  <span>Qty</span>
                </div>
              </th>
              <th className="w-[7%] border px-3 py-2">Requested On</th>
              <th className="w-[7%] border px-3 py-2">Validated On</th>
              <th className="w-[7%] border px-3 py-2">Decided On</th>
              <th className="w-[14%] border px-3 py-2">From</th>
              <th className="w-[14%] border px-3 py-2">To</th>
              <th className="w-[5%] border px-3 py-2">Info</th>
              <th className="w-[8%] border px-3 py-2">Status</th>
              <th className="w-[10%] border px-3 py-2 text-center">Actions</th>
            </tr>
            <tr className="bg-white h-fit">
              <td className="border p-2" />
              <td className="border p-2" />
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
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.validatedOn}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      validatedOn: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.updatedAt}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      updatedAt: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border p-2">
                <select
                  className="w-full border p-1 rounded"
                  value={filterData.fromStore}
                  onChange={(e) =>
                    setFilterData({ ...filterData, fromStore: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value={1}>HRD</option>
                  <option value={2}>CRD</option>
                </select>
              </td>
              <td className="border p-2">
                <select
                  className="w-full border p-1 rounded"
                  value={filterData.toStore}
                  onChange={(e) =>
                    setFilterData({ ...filterData, toStore: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value={1}>HRD</option>
                  <option value={2}>CRD</option>
                </select>
              </td>
              <td className="border p-2" />
              <td className="border p-2">
                <select
                  className="w-full border p-1 rounded"
                  value={filterData.status}
                  onChange={(e) =>
                    setFilterData({ ...filterData, status: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rejected">Rejected</option>
                  <option value="approved">Approved</option>
                  <option value="exported">Exported</option>
                </select>
              </td>
              <td className="border p-2" />
            </tr>
          </thead>
          <tbody>
            {pageData.map((transit, i) => (
              <tr
                key={i}
                className={`h-fit ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="border px-3 py-2 text-center">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">
                  <div className="overflow-visible rounded divide-y">
                    {transit.items.map((item, i) => (
                      <div key={i} className="flex">
                        <span className="w-9/10 py-1 pr-2">
                          {item.category}
                        </span>
                        <span className="w-1/10 py-1 text-center">
                          {item.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="border px-3 py-2">
                  {format(transit.createdAt, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">
                  {transit.validator &&
                    format(transit.validatedOn, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">
                  {transit.decider && format(transit.updatedAt, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">
                  {transit.fromStore === 1 ? "HRD" : "CRD"}
                </td>
                <td className="border px-3 py-2">
                  {transit.toStore === 1 ? "HRD" : "CRD"}
                </td>
                <td className="border px-3 py-2 text-center">
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => {
                      setSelectedTransit(transit);
                      setShow(true);
                    }}
                  >
                    <Eye size={16} className="inline-block pb-0.5 mr-1.5" />
                  </span>
                </td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      statusColors[transit.status.toLowerCase()]
                    }`}
                  >
                    {transit.status}
                  </span>
                </td>
                <td className="border px-3 py-2 text-center">
                  {["rejected", "cancelled"].includes(transit.status) ||
                  (user.storeManaging > 0 &&
                    user.storeManaging !== transit.fromStore) ? null : (
                    <>
                      {/* For Store Manager (only if their store === fromStore && status is pending) */}
                      {user.storeManaging > 0 &&
                      transit.status === "pending" ? (
                        <div className="flex justify-evenly">
                          <button
                            onClick={() => {
                              setAccept(true);
                              setTransitModal(true);
                              setSelectedTransit(transit);
                            }}
                            className="text-green-500 rounded-xl "
                          >
                            <Check strokeWidth={2.5} size={24} />
                          </button>
                          <button
                            onClick={() => {
                              setAccept(false);
                              setTransitModal(true);
                              setSelectedTransit(transit);
                            }}
                            className="text-red-400 rounded-xl"
                          >
                            <X strokeWidth={2.5} size={24} />
                          </button>
                        </div>
                      ) : user.storeManaging === 0 &&
                        ["pending", "accepted", "declined"].includes(
                          transit.status
                        ) ? (
                        <div className="flex justify-between">
                          <button
                            onClick={() => {
                              setApprove(true);
                              setTransitModal(true);
                              setSelectedTransit(transit);
                            }}
                            className="bg-green-500 px-2 py-1.5 rounded-xl text-white hover:bg-green-600"
                          >
                            <Check strokeWidth={2.5} size={22} />
                          </button>
                          <button
                            onClick={() => {
                              setApprove(false);
                              setTransitModal(true);
                              setSelectedTransit(transit);
                            }}
                            className="bg-red-400 px-2 py-1.5 rounded-xl text-white hover:bg-red-500"
                          >
                            <X strokeWidth={2.5} size={22} />
                          </button>
                        </div>
                      ) : transit.status === "exported" ? (
                        <div className="inline-block w-full bg-pink-100 text-black text-sm font-semibold px-1.5 py-1.5 rounded-xl border-2 border-pink-500 shadow-md relative">
                          <span className="block text-center tracking-wide">
                            Exported
                          </span>
                        </div>
                      ) : (
                        <button
                          disabled={transit.status !== "approved"}
                          onClick={() =>
                            navigate(
                              `/admin/transactions/transits/${transit.id}`
                            )
                          }
                          className="w-full bg-teal-500 px-1.5 py-1.5 text-sm rounded-xl text-white hover:bg-teal-600 disabled:bg-gray-400"
                        >
                          Transfer
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!msg && (
        <PageFooter
          rows={rows}
          page={page}
          setPage={setPage}
          setRows={setRows}
          totalPages={totalPages}
        />
      )}

      {msg && <div className="text-center mt-4 text-red-500">{msg}</div>}

      {show && (
        <Modal
          show={show}
          onClose={() => setShow(false)}
          data={{
            "Requested By": selectedTransit.requester.name,
            "Transit Purpose": selectedTransit.description,
            "Validated By": selectedTransit?.validator?.name || "",
            Validation: selectedTransit?.validateInfo || "",
            "Decided By": selectedTransit?.decider?.name || "",
            "Decision Reason": selectedTransit?.decisionReason || "",
          }}
        />
      )}

      {transitModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-md space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {user.storeManaging > 0 ? "Validation" : "Decision"}
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="decisionStatus" className="w-1/4">
                Status
              </label>
              <input
                id="decisionStatus"
                type="text"
                className="w-3/4 border rounded p-1 font-bold"
                value={
                  user.storeManaging > 0
                    ? accept === true
                      ? "Accepted"
                      : "Declined"
                    : approve === true
                    ? "Approved"
                    : "Rejected"
                }
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
                  setAccept(null);
                  setApprove(null);
                  setSelectedTransit(null);
                  setTransitModal(false);
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
                  {user.storeManaging > 0 ? "Validate" : "Decide"}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TransitsList;
