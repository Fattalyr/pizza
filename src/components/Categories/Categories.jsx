import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCat, selectFilter } from "../../Redux/filterSlice";

function Categories() {
  const dispatch = useDispatch();
  const { categories, activeCatogorie } = useSelector(selectFilter);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
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
