import React from "react";
import HeaderSearch from "./HeaderSearch";

export default function Header({ query, setQuery }) {
  return (
    <header className="px-4 py-5 bg-gray-600 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#">usePopcorn</a>
        <HeaderSearch query={query} setQuery={setQuery} />
        <div>
          <button>Wish</button>
        </div>
      </div>
    </header>
  );
}
