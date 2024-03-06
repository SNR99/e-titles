import { CheckCircle2 } from "lucide-react";

export default function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="my-10 flex items-center space-x-2 rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <CheckCircle2 className="2-4 h-4" />
      <span>{message}</span>
    </div>
  );
}
