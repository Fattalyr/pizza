import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCat, selectFilter } from "../../Redux/filterSlice";

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, activeCatogorie } = useSelector(selectFilter);

  return (
    <div className="categories">
      <ul>
        {categories.map((item: any, index: number) => (
          <li
            onClick={() => dispatch(setActiveCat(index))}
            className={activeCatogorie === index ? "active" : ""}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
