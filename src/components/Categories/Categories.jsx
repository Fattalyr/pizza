import React from "react";

function Categories() {
  const [activeCat, setActiveCat] = React.useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетерианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onClickCategories = (index) => {
    setActiveCat(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => onClickCategories(index)}
            className={activeCat === index ? "active" : ""}
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
