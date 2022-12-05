import axios from 'axios';
import React from 'react';

import { useParams, useNavigate } from 'react-router-dom';

const PizzaParams: React.FC = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{ imageUrl: string; name: string; price: number }>();

  React.useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get('https://634fde2edf22c2af7b5c5141.mockapi.io/items/' + id);
        setPizza(data.items);
      } catch (error) {
        alert('Извините, такой пиццы не найдено');
        navigate('/');
      }
    }
    getPizza();
  });

  return (
    <>
      {pizza ? (
        <div className="pizza-block">
          <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{pizza.name}</h4>
          <div className="pizza-block__price">от {pizza.price} ₽</div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default PizzaParams;
