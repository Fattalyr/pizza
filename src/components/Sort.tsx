import React from 'react';

import { useDispatch } from 'react-redux';
import { setActiveSortBy, TSortItem } from '../Redux/filterSlice';

type TSortProps = {
  sortBy: TSortItem[];
  activeSortBy: TSortItem;
};

const Sort: React.FC<TSortProps> = React.memo(({ sortBy, activeSortBy }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = React.useState(false);

  const changeType = (obj: TSortItem) => {
    dispatch(setActiveSortBy(obj));
    setVisible(!isVisible);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & { path: Node[] }; //переопределили тип MouseEvent
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={isVisible ? 'rotated' : ' '}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setVisible(!isVisible)}>{activeSortBy.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortBy.map((sort, index) => (
              <li
                className={sort.name === activeSortBy.name ? 'active' : ''}
                key={index}
                onClick={() => changeType(sort)}
              >
                {sort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
