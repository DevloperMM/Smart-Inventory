import { useState } from "react";
import { CheckCircle } from "lucide-react";

const IssueOptions = () => {
  const [equipNo, setEquipNo] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    console.log(`Verifying Equipment No: ${equipNo}`);
    setIsVerified(true);
  };

  const equipmentList = [];

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white text-gray-800 space-y-5 rounded-2xl">
      <h2 className="text-2xl font-semibold">Verify Issuance</h2>

      <div className="bg-white rounded-2xl space-y-4">
        <div className="flex gap-4">
          <input
            type="number"
            value={equipNo}
            onChange={(e) => {
              setIsVerified(false);
              setEquipNo(e.target.value);
            }}
            placeholder="Enter equipment number..."
            className="border rounded-xl px-4 py-2 w-1/3"
          />
          <button
            disabled={isVerified}
            onClick={handleVerify}
            className={`text-white px-4 rounded-xl flex items-center gap-2 ${
              isVerified
                ? "bg-teal-500"
                : "bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
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
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-3 border">#</th>
              <th className="px-4 py-3 border">Category</th>
              <th className="px-4 py-3 border">Brand</th>
              <th className="px-4 py-3 border">Serial Number</th>
              <th className="px-4 py-3 border">Warranty</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Location</th>
            </tr>
          </thead>
          <tbody>
            {equipmentList.map((item) => (
              <tr
                key={item.id}
                className={`border-t ${
                  selectedId === item.id ? "bg-blue-50 rounded-2xl" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="radio"
                    name="selected"
                    checked={selectedId === item.id}
                    onChange={() => setSelectedId(item.id)}
                    className="accent-cyan-600"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{item.equipNo}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {equipmentList.length === 0 && (
          <p className="text-center py-5 text-gray-400">
            No equipment records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default IssueOptions;
