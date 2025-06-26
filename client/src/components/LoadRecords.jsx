import { Loader2Icon } from "lucide-react";

function LoadRecords() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <Loader2Icon className="w-20 h-20 animate-spin" strokeWidth={0.5} />
    </div>
  );
}

export default LoadRecords;
