import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-[50px] gap-2">
      <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.4s]" />
      <span className="w-3 h-3 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
      <span className="w-3 h-3 bg-orange-300 rounded-full animate-bounce" />
      <span className="w-3 h-3 bg-orange-200 rounded-full animate-bounce [animation-delay:0.2s]" />
    </div>
  );
}