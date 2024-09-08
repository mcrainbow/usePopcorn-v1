import React from "react";
import FilmItem from "./FilmItem";

function FilmList({ filmList, onSelect }) {
  return (
    <ul className="flex flex-col gap-y-5">
      {filmList.map((item) => (
        <FilmItem item={item} key={item.id} onSelect={onSelect} />
      ))}
    </ul>
  );
}

export default FilmList;
