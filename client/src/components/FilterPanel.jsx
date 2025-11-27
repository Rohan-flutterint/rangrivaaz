import React from "react";

export default function FilterPanel({
  filters,
  setFilters,
  states,
  sortBy,
  setSortBy
}) {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="font-semibold mb-3">Filters</h3>

      <label className="block text-sm mb-2">State</label>
      <select
        value={filters.state}
        onChange={(e) => setFilters({ ...filters, state: e.target.value })}
        className="w-full border rounded px-3 py-2 mb-3 text-sm"
      >
        <option value="">All states</option>
        {states.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <label className="block text-sm mb-2">Price range (max)</label>
      <input
        type="range"
        min="0"
        max="500000"
        step="1000"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
        className="w-full mb-2"
      />
      <div className="text-xs text-gray-500 mb-3">Up to ₹{filters.maxPrice.toLocaleString()}</div>

      <label className="block text-sm mb-2">Minimum rating</label>
      <select
        value={filters.minRating}
        onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
        className="w-full border rounded px-3 py-2 mb-3 text-sm"
      >
        <option value={0}>Any</option>
        <option value={4}>4.0+</option>
        <option value={4.5}>4.5+</option>
        <option value={4.8}>4.8+</option>
      </select>

      <label className="block text-sm mb-2">Sort by</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
      >
        <option value="relevance">Relevance</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
        <option value="rating_desc">Rating: High → Low</option>
      </select>
    </div>
  );
}
