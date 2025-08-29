/* eslint-disable @next/next/no-img-element */
import { toast } from "react-hot-toast";

const Toaster = (message: string, isSuccess = true, image?: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-sm w-full ${
        isSuccess ? "bg-white" : "bg-red-100"
      } shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-3`}
    >
      {image && (
        <img
          src={image}
          alt={message}
          className="w-12 h-12 rounded-lg object-cover"
        />
      )}
      <div className="ml-3 flex-1">
        <p
          className={`text-sm font-semibold ${
            isSuccess ? "text-gray-900" : "text-red-700"
          }`}
        >
          {message} {isSuccess ? "✅" : "❌"}
        </p>
      </div>
    </div>
  ));
};

export default Toaster;
