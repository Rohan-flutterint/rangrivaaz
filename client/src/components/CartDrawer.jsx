import React from "react";

export default function CartDrawer({ cart, updateQty, removeFromCart, onCheckout }) {
  return (
    <div className="fixed right-6 bottom-6 bg-white rounded shadow p-4 w-80 z-50">
      <h4 className="font-semibold">Cart</h4>
      <div className="mt-3 space-y-2">
        {cart.length === 0 && <div className="text-gray-500">No items in cart yet</div>}
        {cart.map(it=>(
          <div key={it.id} className="flex justify-between items-center">
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-xs text-gray-500">{it.qty} × ₹{(it.price_per_day ?? it.price ?? it.price_from ?? it.rental_price ?? 0).toLocaleString()}</div>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={()=>removeFromCart(it.id)} className="px-2 py-1 border rounded text-xs">Remove</button>
            </div>
          </div>
        ))}
      </div>
      {cart.length>0 && <div className="mt-3">
        <div className="flex justify-between font-semibold">Total <div>₹{cart.reduce((s,it)=>s + it.qty*(it.price_per_day ?? it.price ?? it.price_from ?? it.rental_price ?? 0),0).toLocaleString()}</div></div>
        <button onClick={onCheckout} className="mt-3 w-full px-3 py-2 bg-primary text-white rounded">Checkout</button>
      </div>}
    </div>
  );
}
