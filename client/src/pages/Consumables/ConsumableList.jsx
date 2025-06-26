import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, Pencil, Plus, PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoadIcon, LoadRecords, PageFooter } from "../../components";
import { format } from "date-fns";
import { useConsumableStore } from "../../store";

const initialState = {
  category: "",
  specs: "",
  updatedBy: "",
  updatedOn: "",
  storeId: "",
};

const ConsumableList = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isUsed, setIsUsed] = useState(null);

  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [isSortAsc, setIsSortAsc] = useState(false);
  const [filterData, setFilterData] = useState(initialState);

  const {
    fetchingConsumables,
    consumables,
    loading,
    getConsumables,
    editConsumable,
    updateQuantity,
  } = useConsumableStore();

  useEffect(() => {
    getConsumables();
  }, [getConsumables]);

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    let data = consumables
      .filter((item) =>
        Object.entries(filterData).every(([key, value]) => {
          if (!value) return true;

          if (key === "storeId") return item[key] === Number(value);
          if (key === "updatedOn") {
            const createdDate = format(new Date(item.updatedOn), "dd-MM-yyyy");
            const valueDate = format(new Date(value), "dd-MM-yyyy");
            return createdDate === valueDate;
          }

          return item[key]?.toLowerCase().includes(value.trim().toLowerCase());
        })
      )
      .sort((a, b) => {
        const dateA = new Date(a.updatedOn);
        const dateB = new Date(b.updatedOn);
        return isSortAsc ? dateA - dateB : dateB - dateA;
      });

    return data;
  }, [filterData, isSortAsc, consumables]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modalType === "edit") await editConsumable(selectedItem.id, inputValue);
    else
      await updateQuantity(
        selectedItem.id,
        inputValue,
        isUsed,
        selectedItem.category
      );

    setInputValue("");
    setIsUsed(null);
    setSelectedItem(null);
    setShowModal(false);

    return;
  };

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  if (fetchingConsumables) return <LoadRecords />;

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Consumables List</h2>
        <button
          onClick={() => navigate("/admin/consumables/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" /> Add Consumables
        </button>
      </div>

      {/* Consumables Table */}
      <div className="overflow-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[4%] border px-3 py-2 text-center">#</th>
              <th className="w-[12%] border px-3 py-2">Category</th>
              <th className="w-[20%] border px-3 py-2">Specifications</th>
              <th className="w-[13%] border px-3 py-2">Updated By</th>
              <th
                className="w-[8%] border px-3 py-2 cursor-pointer break-words whitespace-normal"
                onClick={() => setIsSortAsc(!isSortAsc)}
              >
                <span className="flex items-center gap-1 capitalize">
                  Updated On <ArrowUpDown className="w-4 h-4" />
                </span>
              </th>
              <th className="w-[9%] border px-3 py-2">New</th>
              <th className="w-[9%] border px-3 py-2">Used</th>
              <th className="w-[9%] border px-3 py-2">Total</th>
              <th className="w-[8%] border px-3 py-2">Store</th>
              <th className="w-[8%] border px-3 py-2 text-center">Actions</th>
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
                  value={filterData.specs}
                  onChange={(e) =>
                    setFilterData({ ...filterData, specs: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.updatedBy}
                  onChange={(e) =>
                    setFilterData({ ...filterData, updatedBy: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.updatedOn}
                  onChange={(e) =>
                    setFilterData({ ...filterData, updatedOn: e.target.value })
                  }
                />
              </td>
              <td className="border p-2" />
              <td className="border p-2" />
              <td className="border p-2" />
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
            </tr>
          </thead>
          <tbody>
            {pageData.map((consumable, i) => (
              <tr
                key={i + 1}
                className={`h-12 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="border px-3 py-2 text-center">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">{consumable.category}</td>
                <td className="border px-3 py-2">{consumable.specs}</td>
                <td className="border px-3 py-2">
                  {consumable.storeUpdater.name}
                </td>
                <td className="border px-3 py-2">
                  {format(consumable.updatedOn, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2 bg-emerald-50">
                  {consumable.newQty}
                </td>
                <td className="border px-3 py-2 bg-indigo-50">
                  {consumable.usedQty}
                </td>
                <td className="border px-3 py-2 bg-yellow-50 font-bold">
                  {consumable.usedQty + consumable.newQty}
                </td>
                <td className="border px-3 py-2">
                  {consumable.storeId === 1 ? (
                    <span>HRD</span>
                  ) : (
                    <span>CRD</span>
                  )}
                </td>
                <td className="border px-3 py-2 text-center hover:text-black">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => {
                        setModalType("edit");
                        setSelectedItem(consumable);
                        setInputValue(consumable.specs);
                        setShowModal(true);
                      }}
                      className="text-gray-600 hover:text-black"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setModalType("increase");
                        setSelectedItem(consumable);
                        setShowModal(true);
                      }}
                      className="text-gray-600 hover:text-black"
                    >
                      <PlusSquare size={20} />
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
          setPage={setPage}
          setRows={setRows}
          totalPages={totalPages}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-md space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {modalType === "edit" ? "Specifications" : "Quantity"}
            </h3>

            <input
              type={modalType === "edit" ? "text" : "number"}
              className="w-full border rounded p-2"
              placeholder={
                modalType === "edit"
                  ? "Enter new specs..."
                  : "Add quantity in store..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />

            {modalType === "increase" && (
              <div className="flex flex-row gap-2 justify-between items-center">
                <span className="text-sm text-gray-700">
                  <span className="text-red-500 align-top">*</span> Is the given
                  qty used before ?{""}
                </span>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="isUsed"
                      value="true"
                      checked={isUsed === "true"}
                      onChange={() => setIsUsed("true")}
                      required
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="isUsed"
                      value="false"
                      checked={isUsed === "false"}
                      onChange={() => setIsUsed("false")}
                      required
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                onClick={() => {
                  setInputValue("");
                  setIsUsed(null);
                  setSelectedItem(null);
                  setModalType("");
                  setShowModal(false);
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
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ConsumableList;
