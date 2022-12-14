import './scss/app.scss';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCart } from './Redux/cartSlice';

import Home from './components/Home';
import Header from './components/Header';
import NotFound from './components/NotFound/NotFound';
import PizzaParams from './components/Pizza/PizzaParams';

const Cart = React.lazy(() => import(/* webpackChunkName:"Cart"*/ './components/Cart/Cart'));

const App: React.FC = () => {
  const state = useSelector(selectCart);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(state.items);
      localStorage.setItem('cartPizzas', json);
    }
    isMounted.current = true;
  }, [state.items]);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<div>Загрузка...</div>}>
                  <Cart />
                </Suspense>
              }
            />
            <Route path="/:id" element={<PizzaParams />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
