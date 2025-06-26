import { X } from "lucide-react";

function Modal({ show, onClose, data }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-red-500"
        >
          <X className="border-1 border-black hover:border-red-500" size={24} />
        </button>

        {/* Message */}
        <div>
          {Object.entries(data || {}).map(([key, value]) => (
            <div key={key} className="mb-4">
              <span className="font-bold capitalize block">{key}</span>
              {String(value)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
