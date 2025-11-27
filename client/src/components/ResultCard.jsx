import React from "react";

export default function ResultCard({ item, onView, onAddToCart }) {
  const priceLabel = item.price_per_day
    ? `₹${item.price_per_day.toLocaleString()} / day`
    : item.price
    ? `₹${item.price.toLocaleString()}`
    : item.price_per_event
    ? `₹${item.price_per_event.toLocaleString()}`
    : item.rental_price
    ? `Rent ₹${item.rental_price.toLocaleString()}`
    : item.price_from
    ? `From ₹${item.price_from.toLocaleString()}`
    : "";

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <div className="h-40 bg-gray-100 rounded overflow-hidden mb-3 flex items-center justify-center">
        {item.images?.[0] ? <img src={item.images[0]} alt={item.name} className="object-cover h-full w-full"/> : <div className="text-gray-400">No image</div>}
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-lg">{item.name}</h4>
          <div className="text-sm text-gray-500">{item.state}</div>
        </div>
        <div className="text-yellow-500 font-semibold">★ {item.rating ?? "—"}</div>
      </div>

      <p className="text-sm text-gray-600 mt-2">{item.short_description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="font-semibold">{priceLabel}</div>
        <div className="flex gap-2">
          <button onClick={()=>onView(item)} className="px-3 py-1 border rounded text-sm">View</button>
          <button onClick={()=>onAddToCart(item)} className="px-3 py-1 bg-accent text-white rounded text-sm">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
