import React from "react";

function HeaderSearch({ query, setQuery }) {
  return (
    <input
      type="text"
      className="px-2 py-1 rounded-lg bg-gray-500 border-2 outline-none w-60"
      placeholder="Spider Man..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default HeaderSearch;
