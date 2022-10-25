import React from "react";
import axios from "axios";
import Skeleton from "../Skeleton/Skeleton";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";

import { SearchContext } from "../../App";

import Sort from "../Sort/Sort";
import Pizza from "../Pizza/Pizza";
import Categories from "../Categories/Categories";

function Home() {
  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setItems] = React.useState([]); //Массив пиццц
  const [isLoading, setLoading] = React.useState(false); //Загрузка
  const [countPizzas, setCountPizzas] = React.useState(0); //Количество пицц
  const { activeCatogorie, activeSortBy, onPage } = useSelector(
    (state) => state.filterSlice
  );

  const loadPizzas = (items) => {
    setItems(items);
    setLoading(true);
  };

  React.useEffect(() => {
    let categoriesId = `${
      activeCatogorie > 0 ? `category=${activeCatogorie}` : ""
    }`;
    let sortPizza = `sortBy=${activeSortBy.sortProperty.replace("-", "")}`;
    let order_ASC_DESC = `order=${
      activeSortBy.sortProperty.includes("-") ? "desc" : "asc"
    }`;

    setLoading(false);
    axios
      .get(
        `https://634fde2edf22c2af7b5c5141.mockapi.io/items?search=${searchValue}&page=${onPage}&limit=8&${categoriesId}&${sortPizza}&${order_ASC_DESC}`
      )
      .then((res) => {
        loadPizzas(res.data.items);
        setCountPizzas(res.data.count);
      });
    window.scrollTo(0, 0);
  }, [activeCatogorie, activeSortBy, onPage, searchValue]);

  let pizzaMas =
    pizzas &&
    pizzas
      // .filter((obj) =>
      //   obj.name.toLowerCase().includes(searchValue.toLowerCase())
      // )
      .map((pizza, index) => <Pizza {...pizza} key={index} />);

  let sceleton = [...new Array(6)].map((i, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? pizzaMas : sceleton}</div>
      <Pagination countPizzas={countPizzas} />
    </div>
  );
}

export default Home;
