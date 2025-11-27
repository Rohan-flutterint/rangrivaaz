import React from "react";

export default function TopBar({ onSearch, cartCount }) {
  return (
    <div className="w-full bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="text-3xl font-bold text-primary tracking-tight">RangRivaaz</div>
        <div className="text-sm text-gray-500">Curated venues & vendors</div>
      </div>

      <div className="flex items-center gap-3">
        <input onChange={(e)=>onSearch(e.target.value)} placeholder="Search venues, vendors, decor, gifts..." className="border rounded px-3 py-2 text-sm w-96 focus:ring-2 focus:ring-primary focus:outline-none" />
        <div className="relative">
          <button className="px-3 py-2 border rounded">Cart</button>
          {cartCount > 0 && <div className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">{cartCount}</div>}
        </div>
      </div>
    </div>
  );
}
