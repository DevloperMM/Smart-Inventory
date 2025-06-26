import { Loader2 } from "lucide-react";

function LoadIcon() {
  return (
    <div className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">
      <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
    </div>
  );
}

export default LoadIcon;
