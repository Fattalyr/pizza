import React from "react";
import Categories from "./components/Categories/Categories";
import Header from "./components/Header/Header";
import Pizza from "./components/Pizza/Pizza";
import "./scss/app.scss";
import Sort from "./components/Sort/Sort";

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("https://634fde2edf22c2af7b5c5141.mockapi.io/items")
      .then((res) => res.json())
      .then((items) => setItems(items));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((pizza, index) => (
              <Pizza {...pizza} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
