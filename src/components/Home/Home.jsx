import React from "react";
import Categories from "../Categories/Categories";
import Pizza from "../Pizza/Pizza";
import Sort from "../Sort/Sort";
import Skeleton from "../Skeleton/Skeleton";

function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const [activeCat, setActiveCat] = React.useState(0);
  const [selectedType, setType] = React.useState({
    name: "популярности (ASC)",
    sortProperty: "rating",
  });
  console.log(selectedType);
  const loadPizzas = (items) => {
    setItems(items);
    setLoading(true);
  };

  React.useEffect(() => {
    let categoriesId = `${activeCat > 0 ? `category=${activeCat}` : ""}`;
    let sortPizza = `sortBy=${selectedType.sortProperty.replace("-", "")}`;
    let order_ASC_DESC = `order=${
      selectedType.sortProperty.includes("-") ? "desc" : "asc"
    }`;
    console.log(order_ASC_DESC);
    setLoading(false);
    fetch(
      `https://634fde2edf22c2af7b5c5141.mockapi.io/items?${categoriesId}&${sortPizza}&${order_ASC_DESC}`
    )
      .then((res) => res.json())
      .then((items) => loadPizzas(items));
    window.scrollTo(0, 0);
  }, [activeCat, selectedType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCat={activeCat} setActiveCat={setActiveCat} />
        <Sort selectedType={selectedType} setType={setType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? items.map((pizza, index) => <Pizza {...pizza} key={index} />)
          : [...new Array(6)].map((i, index) => <Skeleton key={index} />)}
      </div>
    </div>
  );
}

export default Home;
