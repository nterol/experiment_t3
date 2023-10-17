import React from "react";

export function MakeMeRed({ children }: { children: React.ReactNode }) {
  return <p className="font-extrabold text-red-800 underline">{children}</p>;
}
