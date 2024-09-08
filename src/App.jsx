import { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <Main query={query} />
    </>
  );
}

export default App;
