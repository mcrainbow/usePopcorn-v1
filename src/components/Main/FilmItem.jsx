import React from "react";

export default function FilmItem({ item, onSelect }) {
  return (
    <li
      key={item.id}
      className="bg-gray-500 hover:bg-opacity-70 cursor-pointer flex items-center pr-5 rounded-lg"
      onClick={() => onSelect(item)}
    >
      {item.poster.url !== null ? (
        <img
          src={item?.poster?.url}
          alt=""
          className="h-60 w-40 mr-20 rounded-tl-lg rounded-bl-lg"
        />
      ) : (
        <div className="h-60 w-40 mr-20 rounded-tl-lg rounded-bl-lg bg-gray-900 flex items-center justify-center">
          <span className="-rotate-45">Poster Not Founded</span>
        </div>
      )}
      <h3 className={`text-xl font-semibold ${!item.name && "text-red-500"}`}>
        {item.name ?? "Мы собираем данные об этом фильме"}
      </h3>
      <div className="flex ml-auto gap-x-10">
        <span>{item.rating.kp ?? item.rating}</span>
        <span>{item.year}</span>
      </div>
    </li>
  );
}
