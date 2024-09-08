import React, { useState } from "react";
import StarRating from "../UI/StarRating";

export default function FilmDetails({ selectedMovie, onClose, isLoading }) {
  if (isLoading)
    return (
      <div className="bg-gray-600 rounded-lg text-white pb-4 relative h-60 flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );

  return (
    <div
      className={`bg-gray-600 rounded-lg text-white pb-4 relative ${
        !selectedMovie ? `h-60 flex items-center justify-center` : "h-fit"
      }`}
    >
      {selectedMovie && !isLoading ? (
        <>
          <button
            onClick={onClose}
            className="absolute px-3 py-2 right-3 top-2 flex items-center justify-center w-8 h-8 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-300"
            aria-label="Закрыть фильм"
          >
            <span className="text-xl font-bold">&times;</span>
          </button>
          {selectedMovie?.poster?.url ? (
            <img
              src={selectedMovie?.poster?.url}
              alt=""
              className="rounded-tl-lg rounded-tr-lg border-none w-full"
            />
          ) : (
            <div className="rounded-tl-lg rounded-tr-lg border-none bg-gray-900 flex items-center justify-center h-[30rem]">
              <span className="-rotate-45">Poster Not Founded</span>
            </div>
          )}
          <div className="px-2 py-2">
            <h3 className="text-center mb-4 text-xl font-bold">
              {selectedMovie?.name}
            </h3>
            <p className="italic mb-4">{selectedMovie?.description}</p>
            <div className="flex justify-between items-center">
              <span>
                {selectedMovie.countries
                  .slice(0, 3)
                  .map((item) => item.name)
                  .join(", ")}
              </span>
              <span className="font-bold">{selectedMovie.year}г.</span>
            </div>
            <StarRating maxLength={10} />
            <button className="block mx-auto px-4 py-2 bg-gray-800 mt-10 rounded-lg text-lg font-semibold hover:bg-gray-900 hover:bg-opacity-50 transition-all duration-300">
              Add to Favourite
            </button>
          </div>
        </>
      ) : (
        <p className="text-xl">Please, select a film</p>
      )}
    </div>
  );
}
