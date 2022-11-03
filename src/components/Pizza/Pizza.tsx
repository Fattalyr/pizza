import React from 'react';
import { Link } from 'react-router-dom';

import { TPizza } from '../../Redux/fetchPizzasSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addPizza, selectCountCart } from '../../Redux/cartSlice';

const Pizza: React.FC<TPizza> = ({ imageUrl, name, sizes, price, types, id }) => {
  const typesPizzas = ['тонкое', 'традиционное'];
  const [typePizza, setTypePizza] = React.useState(0);
  const [sizePizza, setSizePizza] = React.useState(0);

  const dispatch = useDispatch();
  const count = useSelector(selectCountCart(id));

  const addedCount = count ? count.count : 0;

  const items = {
    imageUrl,
    name,
    size: sizes[sizePizza],
    price,
    type: typesPizzas[typePizza],
    id,
    count: 1,
  };

  return (
    <div className="pizza-block">
      <Link to={id}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              className={typePizza === index ? 'active' : ''}
              onClick={() => setTypePizza(index)}
            >
              {typesPizzas[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              className={sizePizza === index ? 'active' : ''}
              onClick={() => setSizePizza(index)}
            >
              {size}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          onClick={() => dispatch(addPizza(items))}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default Pizza;
