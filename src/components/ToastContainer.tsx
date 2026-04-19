import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";

export function ToastContainer() {
  const { notifications, removeNotification } = useNotification();

  const iconMap = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const bgMap = {
    success: "bg-green-50 border-green-200 text-green-900",
    error: "bg-red-50 border-red-200 text-red-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 pointer-events-none sm:bottom-6 sm:right-6">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg border pointer-events-auto
            animate-in fade-in slide-in-from-bottom-2 duration-300
            ${bgMap[notification.type]}
          `}
        >
          {iconMap[notification.type]}
          <span className="text-sm font-medium flex-1">{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-2 text-current hover:opacity-70 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
