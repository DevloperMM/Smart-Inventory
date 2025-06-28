import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import {
  useAssetStore,
  useConsumableStore,
  useRequestStore,
} from "../../../store";
import { LoadRecords } from "../../../components";
import toast from "react-hot-toast";

const IssueOptions = ({ setStep }) => {
  const { request } = useRequestStore();
  const {
    getUnissuedAssets,
    loadUnissuedAssets,
    unissuedAssets,
    issueAsset,
    getAssetByEquipNo,
  } = useAssetStore();
  const {
    issueConsumable,
    getUnissuedConsumables,
    loadUnissuedConsumables,
    unissuedConsumables,
  } = useConsumableStore();

  const isAssetRequest = request.itemType === "asset";

  const [equipNo, setEquipNo] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState([]);
  const [msg, setMsg] = useState(false);
  const [consumeData, setConsumeData] = useState({});

  useEffect(() => {
    const updatedOptions = isAssetRequest
      ? unissuedAssets
      : unissuedConsumables;
    setOptions(updatedOptions);
    setMsg(showOptions && updatedOptions.length <= 0);
  }, [
    unissuedAssets,
    unissuedConsumables,
    isAssetRequest,
    isVerified,
    showOptions,
  ]);

  useEffect(() => {
    if (!isAssetRequest && options.length > 0) {
      const initialData = {};
      options.forEach((item) => {
        initialData[item.id] = {
          isUsed: false,
          isIntegrable: false,
        };
      });
      setConsumeData(initialData);
    }
  }, [options, isAssetRequest]);

  const handleVerify = async () => {
    setMsg(false);
    setSelectedId(null);

    if (isAssetRequest) {
      await getUnissuedAssets(equipNo, request.category);
    } else {
      await getUnissuedConsumables(request.category, request.storeId);
    }

    setShowOptions(true);
    setIsVerified(true);
  };

  const handleProceed = async (e) => {
    e.preventDefault();

    if (!selectedId) return toast.error("Select atleast one option");

    const selectedData = consumeData?.[selectedId] || {
      isUsed: false,
      isIntegrable: false,
    };

    if (isAssetRequest) await issueAsset(request.id, selectedId, equipNo);
    else {
      const asset = await getAssetByEquipNo(equipNo);
      await issueConsumable(
        request.id,
        selectedId,
        asset.id,
        selectedData.isUsed,
        selectedData.isIntegrable
      );
    }

    setStep(1);
  };

  if (loadUnissuedAssets || loadUnissuedConsumables) return <LoadRecords />;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white text-gray-800 space-y-5 rounded-2xl">
      <h2 className="text-2xl font-semibold">Verify Issuance</h2>

      <div className="bg-white rounded-2xl space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={equipNo}
            onChange={(e) => {
              setMsg(false);
              setIsVerified(false);
              setShowOptions(false);
              setEquipNo(e.target.value);
            }}
            placeholder="Enter equipment number..."
            className="border rounded-xl px-4 py-2 w-1/3"
          />
          <button
            disabled={isVerified}
            onClick={handleVerify}
            className={`text-white px-4 rounded-xl flex items-center gap-2 ${
              isVerified ? "bg-teal-500" : "bg-emerald-500"
            }`}
          >
            {isVerified ? (
              <>
                <CheckCircle size={18} /> <span>Verified</span>{" "}
              </>
            ) : (
              <span>Verify</span>
            )}
          </button>
        </div>
      </div>

      {/* Table Section */}
      {showOptions && options.length > 0 && (
        <div className="overflow-x-auto">
          <>
            {isAssetRequest ? (
              <table className="w-full table-auto text-sm border-collapse">
                <thead className="bg-gray-100 text-gray-700 text-left">
                  <tr>
                    <th className="px-4 py-3 border-t text-center">#</th>
                    <th className="px-4 py-3 border">Category</th>
                    <th className="px-4 py-3 border">Brand</th>
                    <th className="px-4 py-3 border">Serial number</th>
                    <th className="px-4 py-3 border">In warranty</th>
                    <th className="px-4 py-3 border-t">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {options.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-t ${
                        selectedId === item.id ? "bg-blue-50 rounded-2xl" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-center">
                        <input
                          type="radio"
                          name="selected"
                          checked={selectedId === item.id}
                          onChange={() => setSelectedId(item.id)}
                          className="accent-cyan-600"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium border-l border-gray-500">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 border-l border-gray-500">
                        {item.mfgBy}
                      </td>
                      <td className="px-4 py-3 border-l border-gray-500">
                        {item.serialNo}
                      </td>
                      <td className="px-4 py-3 border-l border-gray-500">
                        {new Date(item.warranty) > new Date() ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-3 border-l border-gray-500">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full table-auto text-sm border-collapse">
                <thead className="bg-gray-100 text-gray-700 text-left">
                  <tr>
                    <th className="px-4 py-3 border text-center">#</th>
                    <th className="px-4 py-3 border">Category</th>
                    <th className="px-4 py-3 border">Specifications</th>
                    <th className="px-4 py-3 border">New Stock</th>
                    <th className="px-4 py-3 border">Old Stock</th>
                    <th className="px-4 py-3 border">Used Stock</th>
                    <th className="px-4 py-3 border">Integrated</th>
                  </tr>
                </thead>
                <tbody>
                  {options.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-t ${
                        selectedId === item.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-center">
                        <input
                          type="radio"
                          name="selected"
                          checked={selectedId === item.id}
                          onChange={() => setSelectedId(item.id)}
                          className="accent-cyan-600"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">{item.category}</td>
                      <td className="px-4 py-3">{item.specs}</td>
                      <td className="px-4 py-3">{item.newQty}</td>
                      <td className="px-4 py-3">{item.usedQty}</td>
                      <td className="px-4 py-3">
                        <select
                          value={consumeData[item.id]?.isUsed ? "Yes" : "No"}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          onChange={(e) =>
                            setConsumeData((prev) => ({
                              ...prev,
                              [item.id]: {
                                ...(prev[item.id] || {}),
                                isUsed: e.target.value === "Yes",
                              },
                            }))
                          }
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={
                            consumeData[item.id]?.isIntegrable ? "Yes" : "No"
                          }
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          onChange={(e) =>
                            setConsumeData((prev) => ({
                              ...prev,
                              [item.id]: {
                                ...(prev[item.id] || {}),
                                isIntegrable: e.target.value === "Yes",
                              },
                            }))
                          }
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <hr />
            <div className="block text-right mt-4">
              <button
                onClick={handleProceed}
                className="bg-emerald-500 text-white px-3 py-2.5 rounded-xl hover:bg-emerald-600"
              >
                Proceed
              </button>
            </div>
          </>
        </div>
      )}

      {msg && (
        <p className="text-center py-5 text-red-500">
          No records available for this equipment
        </p>
      )}
    </div>
  );
};

export default IssueOptions;
