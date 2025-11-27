import React from "react";

export default function Modal({ open, onClose, item }) {
  if (!open || !item) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-2xl">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-56 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
            {item.images?.[0] && <img src={item.images[0]} className="h-full w-full object-cover" alt={item.name} />}
          </div>
          <div>
            <p className="text-gray-700">{item.short_description}</p>
            <div className="mt-3 text-sm text-gray-600">
              <div><strong>State:</strong> {item.state}</div>
              {item.capacity && <div><strong>Capacity:</strong> {item.capacity}</div>}
              {item.price_per_day && <div><strong>Price/day:</strong> ₹{item.price_per_day.toLocaleString()}</div>}
              {item.price && <div><strong>Price:</strong> ₹{item.price.toLocaleString()}</div>}
            </div>

            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 border rounded" onClick={onClose}>Close</button>
              <button className="px-4 py-2 bg-accent text-white rounded">Contact / Mock Book</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
