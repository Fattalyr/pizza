// import { useWhyDidYouUpdate } from "ahooks"; //смотрит за перерисовкой компонента
import React from "react";
import {useDispatch } from "react-redux";
import { setActiveCat} from "../../Redux/filterSlice";

type TCategoriesProps = {
  categories: string[];
  activeCatogorie: number;
}
const Categories: React.FC<TCategoriesProps> = React.memo (({categories, activeCatogorie}) => {
  const dispatch = useDispatch();
  // useWhyDidYouUpdate('useWhyDidYouUpdateComponent', {categories, activeCatogorie}); 
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index: number) => (
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
})

export default Categories;
