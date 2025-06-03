import { useState } from "react";
import { Pencil, Check } from "lucide-react";

function StockAlertColumn({ item }) {
  const [inputValue, setInputValue] = useState(item.alertQty || 0);
  const [isReadOnly, setIsReadOnly] = useState(true);

  return (
    <div className="flex justify-between gap-3">
      <div className="flex space-x-2 ml-2">
        <input
          name={item.id}
          value={inputValue}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value)) setInputValue(value);
          }}
          readOnly={isReadOnly}
          className={`w-18 pl-2 py-1 rounded-lg outline-none ${
            !isReadOnly ? "border" : ""
          }`}
        />
        {!isReadOnly && (
          <button
            onClick={() => setIsReadOnly(true)}
            className="text-gray-500 hover:text-black"
          >
            <Check size={20} strokeWidth={3} />
          </button>
        )}
      </div>

      <button
        onClick={() => setIsReadOnly(false)}
        className="text-gray-500 hover:text-black"
      >
        <Pencil size={18} />
      </button>
    </div>
  );
}

export default StockAlertColumn;
