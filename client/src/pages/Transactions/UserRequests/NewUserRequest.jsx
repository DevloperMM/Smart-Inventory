import { useState } from "react";

function NewUserRequest() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ itemName, quantity, remarks });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-cyan-800 mb-8 text-center">
        Create New Request
      </h2>

      <div className="max-w-2xl mx-auto bg-white/50 rounded-2xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex mb-1 items-center">
            <label className="w-1/5 font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className="w-4/5 border border-gray-300 rounded-lg px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Select your category"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. 2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks (Optional)
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Please give equipment number ..."
            ></textarea>
          </div>

          <div className="">
            <button
              type="submit"
              className="block mx-auto bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-lg transition-all"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewUserRequest;
