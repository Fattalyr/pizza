import React from "react";
import Header from "./components/Header/Header";
import "./scss/app.scss";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";

export const SearchContext = React.createContext();

function App() {
  let [searchValue, setSearchValue] = React.useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
