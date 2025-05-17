import { X } from "lucide-react";

function Modal({ show, onClose, data }) {
  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          <X />
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
