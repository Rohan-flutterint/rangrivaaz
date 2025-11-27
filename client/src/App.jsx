import React, { useMemo, useState } from "react";
import TopBar from "./components/TopBar";
import FilterPanel from "./components/FilterPanel";
import ResultCard from "./components/ResultCard";
import Modal from "./components/Modal";
import CartDrawer from "./components/CartDrawer";
import venuesData from "./data/venues.json";
import vendorsData from "./data/vendors.json";

const TABS = [
  { id: "venues", label: "Venues" },
  { id: "decor", label: "Decor & Accessories" },
  { id: "artists", label: "Artists / Influencers" },
  { id: "clothing", label: "Clothing & Jewelry" },
  { id: "gifts", label: "Return Gifts" }
];

function mapItemCategory(item) {
  if (item.type === "venue") return "venues";
  if (item.type === "decor" || item.category === "decor") return "decor";
  if (item.category === "artist" || item.type === "artist") return "artists";
  if (item.type === "dress" || item.category === "dress") return "clothing";
  if (item.type === "gift" || item.category === "gift") return "gifts";
  return "artists";
}

export default function App(){
  const data = useMemo(()=>[...venuesData, ...vendorsData],[]);
  const [activeTab, setActiveTab] = useState("venues");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ state: "", maxPrice: 500000, minRating: 0 });
  const [sortBy, setSortBy] = useState("relevance");
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const categorized = useMemo(()=>{
    const out = { venues: [], decor: [], artists: [], clothing: [], gifts: [] };
    data.forEach(d=>{
      const cat = mapItemCategory(d);
      if(!out[cat]) out[cat]=[];
      out[cat].push(d);
    });
    return out;
  },[data]);

  function onView(item){ setSelected(item); setModalOpen(true); }
  function addToCart(item){ setCart(c=>{ const ex = c.find(x=>x.id===item.id); if(ex) return c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x); return [...c,{...item,qty:1}]; }); }
  function removeFromCart(id){ setCart(c=>c.filter(x=>x.id!==id)); }
  function doCheckout(){
    // POST to server checkout mock
    fetch('http://localhost:4000/api/checkout', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:cart})})
      .then(()=>{ alert('Demo checkout complete'); setCart([]); })
      .catch(()=>{ alert('Checkout (demo) could not reach server - but cleared locally'); setCart([]); });
  }

  const results = useMemo(()=>{
    let out = (categorized[activeTab]||[]).slice();
    const q = (query||'').trim().toLowerCase();
    if(q) out = out.filter(d=>(d.name && d.name.toLowerCase().includes(q)) || (d.short_description && d.short_description.toLowerCase().includes(q)) || ((d.tags||[]).join(' ').toLowerCase().includes(q)) || ((d.category||'').toLowerCase().includes(q)));
    if(filters.state) out = out.filter(d=>d.state===filters.state);
    out = out.filter(d=>{ const price = d.price_per_day ?? d.price ?? d.price_per_event ?? d.rental_price ?? d.price_from ?? 0; return price <= (filters.maxPrice ?? 9999999); });
    out = out.filter(d=> (d.rating ?? 0) >= (filters.minRating ?? 0));
    if(sortBy==='price_asc'){ out.sort((a,b)=>((a.price_per_day ?? a.price ?? a.price_from ?? 0)-(b.price_per_day ?? b.price ?? b.price_from ?? 0))); }
    else if(sortBy==='price_desc'){ out.sort((a,b)=>((b.price_per_day ?? b.price ?? b.price_from ?? 0)-(a.price_per_day ?? a.price ?? a.price_from ?? 0))); }
    else if(sortBy==='rating_desc'){ out.sort((a,b)=>( (b.rating ?? 0)-(a.rating ?? 0) )); }
    return out;
  },[categorized,activeTab,query,filters,sortBy]);

  const states = useMemo(()=>{ const s=new Set(data.map(d=>d.state).filter(Boolean)); return Array.from(s).sort(); },[data]);

  return (
    <div className="min-h-screen">
      <TopBar onSearch={setQuery} cartCount={cart.length} />

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterPanel filters={filters} setFilters={setFilters} states={states} sortBy={sortBy} setSortBy={setSortBy} />
          <div className="bg-white p-4 rounded shadow mt-4">
            <h4 className="font-semibold">Quick Cart</h4>
            <div className="mt-3 space-y-2">
              {cart.length===0 && <div className="text-gray-500">No items in cart yet</div>}
              {cart.map(c=>(
                <div key={c.id} className="flex justify-between items-center gap-3">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.qty} × ₹{(c.price_per_day ?? c.price ?? c.price_from ?? c.rental_price ?? 0).toLocaleString()}</div>
                  </div>
                  <div><button onClick={()=>removeFromCart(c.id)} className="px-2 py-1 border rounded text-sm">Remove</button></div>
                </div>
              ))}
              {cart.length>0 && <div className="mt-3 flex justify-between items-center"><div className="font-semibold">Total</div><div className="font-semibold">₹{cart.reduce((s,it)=>s + it.qty*(it.price_per_day ?? it.price ?? it.price_from ?? it.rental_price ?? 0),0).toLocaleString()}</div></div>}
              {cart.length>0 && <div className="mt-3"><button onClick={doCheckout} className="w-full px-4 py-2 bg-saffron text-white rounded">Checkout</button></div>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {TABS.map(t=>(
                <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`px-4 py-2 rounded ${activeTab===t.id ? 'bg-primary text-white' : 'bg-white border'}`}>{t.label}</button>
              ))}
            </div>

            <div className="text-sm text-gray-600">Results: {results.length} items</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(item=>(
              <ResultCard key={item.id} item={item} onView={onView} onAddToCart={addToCart} />
            ))}
          </div>
          {results.length===0 && <div className="mt-6 bg-white p-6 rounded shadow text-center text-gray-600">No results — try changing filters or search terms.</div>}
        </div>
      </div>

      <Modal open={modalOpen} onClose={()=>setModalOpen(false)} item={selected} />
      <CartDrawer cart={cart} removeFromCart={removeFromCart} onCheckout={doCheckout} />
      <footer className="text-center p-6 text-sm text-gray-500">RangRivaaz • Demo MVP — Not for production</footer>
    </div>
  );
}
