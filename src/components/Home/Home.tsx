import React from "react";
import Skeleton from "../Skeleton/Skeleton";
import Pagination from "../Pagination/Pagination";
import { useSelector} from "react-redux";
import { fetchPizzas, selectPizzas } from "../../Redux/fetchPizzasSlice";
import { selectFilter } from "../../Redux/filterSlice";
import Sort from "../Sort/Sort";
import Pizza from "../Pizza/Pizza";
import Categories from "../Categories/Categories";
import { useAppDispatch } from "../../Redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items, countPizzas, loading } = useSelector(selectPizzas);

  const { activeCatogorie, activeSortBy, onPage, searchValue } =
    useSelector(selectFilter);

  React.useEffect(() => {
    const categoriesId = `${
      activeCatogorie > 0 ? `category=${activeCatogorie}` : ""
    }`;
    const sortPizza = `sortBy=${activeSortBy.sortProperty.replace("-", "")}`;
    const order_ASC_DESC = `order=${
      activeSortBy.sortProperty.includes("-") ? "desc" : "asc"
    }`;
    
    dispatch(
      fetchPizzas({
        categoriesId,
        sortPizza,
        order_ASC_DESC,
        searchValue,
        onPage,
      })
    );

    window.scrollTo(0, 0);
  }, [activeCatogorie, activeSortBy, dispatch, onPage, searchValue]);

  let pizzaMas = items.map((pizza, index) => <Pizza {...pizza} key={index} />);

  let sceleton = [...new Array(6)].map((i, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loading ? sceleton : pizzaMas}</div>
      <Pagination countPizzas={countPizzas} />
    </div>
  );
}

export default Home;
