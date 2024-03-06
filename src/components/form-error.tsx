import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="my-5 flex items-center space-x-2 rounded-lg bg-destructive/15 p-3 text-sm text-red-500">
      <ExclamationTriangleIcon className="2-4 h-4" />
      <span>{message}</span>
    </div>
  );
}
