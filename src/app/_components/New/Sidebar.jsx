'use client'
import * as React from "react";
import { SidebarItem } from "./SidebarItem";
import { Divider } from "./Divider";

const sidebarItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/c102e886e5a8452988b294946007fcdb/761175a16ce19e800cf40a2fdc05d7c838c6f46ef2c9042cb1684dc3eda5e302?apiKey=c102e886e5a8452988b294946007fcdb&", label: "Merge", active: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/c102e886e5a8452988b294946007fcdb/7dada1141654c39859ceeeb091206b1157a49ee6374fc32f7e1ee078a1e6da4a?apiKey=c102e886e5a8452988b294946007fcdb&", label: "Compress" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/c102e886e5a8452988b294946007fcdb/6a3a9076ae5d79d5fe57cba05e8458a577e30bb2d4366120b3bcb008fe427f75?apiKey=c102e886e5a8452988b294946007fcdb&", label: "Edit", soon: true },
];

const bottomItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/c102e886e5a8452988b294946007fcdb/2a40cf5df7113b95fa9eb2955b4f33023e3e320ba2b1c1e6e58d2746754bf8b8?apiKey=c102e886e5a8452988b294946007fcdb&", label: "Documentation" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/c102e886e5a8452988b294946007fcdb/fb05c807dbbfe5cd938607561348a5a1a97a6d8cc0ede002ecd4e114806c81e7?apiKey=c102e886e5a8452988b294946007fcdb&", label: "Support Us" },
];

export function Sidebar() {
  return (
    <div className="
    flex flex-col justify-between px-6 py-8 bg-white min-h-screen w-[260px] 
    relative before:content-[''] before:absolute before:top-0 before:right-0
    before:h-full before:w-[1px] before:bg-gradient-to-b 
    before:from-[#072E4A] before:to-[#F0F9FF]
  ">
      <div>
        <div className="flex items-center gap-2 mb-8 text-xl font-bold text-sky-950">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/c102e886e5a8452988b294946007fcdb/4c121c53a6c1c6ac68d75db1d63c550b2cadf88af51f616f7cedd38d74828f61?apiKey=c102e886e5a8452988b294946007fcdb&"
            alt="NODFF Logo"
            className="w-8 h-auto"
          />
          <span>NODFF</span>
        </div>
        <div className="space-y-2 ">
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </div>
        <Divider className="mt-8" />
      </div>
      <div className="space-y-2">
        {bottomItems.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}