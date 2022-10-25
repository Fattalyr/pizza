import React from "react";
import Categories from "../Categories/Categories";
import Pizza from "../Pizza/Pizza";
import Sort from "../Sort/Sort";
import Skeleton from "../Skeleton/Skeleton";
import Pagination from "../Pagination/Pagination";
import { SearchContext } from "../../App";
import { useSelector } from "react-redux";

function Home() {
  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setItems] = React.useState([]); //Массив пиццц
  const [pizzasCount, setPizzasCount] = React.useState(0); //Общее количтво пицц
  const [onPage, setOnPage] = React.useState(1); //Выбранная страницы
  const [isLoading, setLoading] = React.useState(false); //Загрузка

  const { activeCatogorie, activeSortBy } = useSelector(
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
    fetch(
      `https://634fde2edf22c2af7b5c5141.mockapi.io/items?page=${onPage}&limit=8&${categoriesId}&${sortPizza}&${order_ASC_DESC}`
    )
      .then((res) => res.json())
      .then((items) => {
        loadPizzas(items.items);
        setPizzasCount(items.count);
      });
    window.scrollTo(0, 0);
  }, [activeCatogorie, activeSortBy, onPage]);

  let pizzaMas =
    pizzas &&
    pizzas
      .filter((obj) =>
        obj.name.toLowerCase().includes(searchValue.toLowerCase())
      )
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
      <Pagination pizzasCount={pizzasCount} setOnPage={setOnPage} />
    </div>
  );
}

export default Home;
