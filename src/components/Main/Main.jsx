import React, { useEffect, useState } from "react";
import FilmList from "./FilmList";
import FilmDetails from "./FilmDetails";

const tempData = [
  {
    name: "Spider Man",
    year: "2004",
    id: 999,
    countries: ["France", "USA", "Norway"],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam error deleniti officiis ullam. Facilis commodi architecto veniam quod praesentium. Assumenda error expedita a iste maxime esse dolores obcaecati magnam laborum?",
    rating: 7.2,
    poster: {
      url: "https://i.pinimg.com/736x/c9/ae/ad/c9aeade42d5de9a751bbc945e0bd45a4.jpg",
    },
  },
  {
    name: "Hulk",
    year: "2004",
    id: 9,
    countries: ["France", "USA"],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam error deleniti officiis ullam. Facilis commodi architecto veniam quod praesentium. Assumenda error expedita a iste maxime esse dolores obcaecati magnam laborum?",
    rating: 7.2,
    poster: {
      url: "https://avatars.mds.yandex.net/i?id=df816953c23f01419bb6f74fcb812b35_l-5875605-images-thumbs&n=13",
    },
  },
  {
    name: "1+1",
    year: "2015",
    id: 94,
    countries: ["France", "USA", "Norway"],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam error deleniti officiis ullam. Facilis commodi architecto veniam quod praesentium. Assumenda error expedita a iste maxime esse dolores obcaecati magnam laborum?",
    rating: 7.2,
    poster: {
      url: "https://avatars.mds.yandex.net/i?id=1d17030dc0304edbcd9c6d067eee506a_l-5236341-images-thumbs&n=13",
    },
  },
  {
    name: "Project X",
    year: "2013",
    id: 939,
    countries: ["France", "USA", "Norway"],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam error deleniti officiis ullam. Facilis commodi architecto veniam quod praesentium. Assumenda error expedita a iste maxime esse dolores obcaecati magnam laborum?",
    rating: 7.2,
    poster: {
      url: "https://avatars.yandex.net/get-music-content/4382102/e3202396.a.17903290-1/m1000x1000?webp=false",
    },
  },
];

const API_TOKEN = "QDRQERM-1ZGM7RQ-K2C499W-B656WZB";
const API_LINK = "https://api.kinopoisk.dev/v1.4/movie";

export default function Main({ query }) {
  const [filmList, setFilmList] = useState(tempData);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isErrorDetails, setIsErrorDetails] = useState(null);

  // useEffect for the first render of the page with top-10 films
  useEffect(() => {
    setIsLoadingList(true);
    async function getData() {
      try {
        const response = await fetch(
          API_LINK +
            `${
              query
                ? `/search?page=1&limit=10&query=${query}&sortType=1`
                : "?page=1&limit=10&notNullFields=top250&sortField=top250&sortType=1&type=movie"
            }`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": API_TOKEN,
            },
          }
        );
        const data = await response.json();
        setFilmList(data.docs);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingList(false);
      }
    }
    getData();
  }, []);

  // useEffect for the query with 300ms delay
  useEffect(() => {
    setIsLoadingList(true);
    const handler = setTimeout(() => {
      if (query) {
        getData(); // Запрос к API
      }
    }, 300); // Задержка в 300 мс

    return () => {
      clearTimeout(handler); // Очищаем таймер при изменении query
    };

    async function getData() {
      try {
        const response = await fetch(
          API_LINK + `${`/search?page=1&limit=10&query=${query}&sortType=1`}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": API_TOKEN,
            },
          }
        );
        const data = await response.json();
        console.log(data.docs);
        setFilmList(data.docs);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingList(false);
      }
    }
  }, [query]);

  const handleMovieClick = async (movie) => {
    setIsLoadingDetails(true);
    try {
      const response = await fetch(API_LINK + `/${movie.id}`, {
        method: "GET",
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      }); // Ваш API эндпоинт
      const data = await response.json();
      console.log(data);
      setSelectedMovie(data);
    } catch (e) {
      console.error(e.message);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleCloseMovieDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <main className="py-20 px-4">
      <div className="container mx-auto rounded-lg">
        <div className="grid grid-cols-[3fr,2fr] gap-x-5 w-4/5 mx-auto">
          {isLoadingList ? (
            <span className="text-center text-white mt-10 font-bold text-lg">
              Loading...
            </span>
          ) : (
            <div className="rounded-lg text-white">
              <FilmList filmList={filmList} onSelect={handleMovieClick} />
            </div>
          )}
          <FilmDetails
            selectedMovie={selectedMovie}
            onClose={handleCloseMovieDetails}
            isLoading={isLoadingDetails}
          />
        </div>
      </div>
    </main>
  );
}
