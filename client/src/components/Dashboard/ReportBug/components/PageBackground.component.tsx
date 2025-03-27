import { memo } from "react";

export const PageBackground = memo(() => (
  <div className="absolute inset-0">
    <div className="absolute inset-0">
      <div className="absolute top-0 right-0 w-full h-full bg-[#1a1a1a] opacity-90" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
    </div>
  </div>
));

PageBackground.displayName = "PageBackground"; 