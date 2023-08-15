import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getItemsThunk } from '../../redux/Item/itemSlice';
import Category from '../category/Category';
import HeaderText from '../headerText/HeaderText';
// import ShowItem from './Showitem';
import './item.css';

const Item = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  const { categories } = useSelector((state) => state.categories);
  const { itemsByCategory } = useSelector((state) => state.items);
  // const [isLoading, setIsLoading] = useState(false);
  // const [selectedItemId, setSelectedItemId] = useState(null);
  // const handleItemClick = (itemId) => {
  //   setSelectedItemId(itemId);
  // };

  useEffect(() => {
    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        const categoryId = category.id;
        if (!itemsByCategory[categoryId]) {
          dispatch(getItemsThunk(categoryId));
        }
      });
    }
  }, [categories, itemsByCategory, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'failed') {
    return <div>Failed to load data</div>;
  }

  return (
    <section className="Item__conatiner" id="item">
      <div className="headerText">
        <HeaderText />
      </div>
      <div className="category">
        <Category />
      </div>
      <div className="item">
        {categories.map((category) => (
          <div key={category.id} className="single__category">
            <h2 className="category__name">{category.name}</h2>
            {itemsByCategory[category.id] && (
            <div className="item__card">
              {itemsByCategory[category.id].map((item) => (
                <div className="item__info" key={item.id}>
                  {/* <a
                    className="item__name"
                    onClick={() => handleItemClick(item.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleItemClick(item.id);
                      }
                    }}
                    tabIndex="0" // Ensure the element is focusable
                    role="button"
                  >
                    {item.name}
                  </a> */}
                  <Link
                    className="item__name"
                    to={`/categories/${category.id}/items/${item.id}`}
                  >
                    {item.name}
                  </Link>
                  <span className="plus__button">+</span>
                </div>
              ))}
            </div>
            )}
          </div>
        ))}
      </div>
      {/* {selectedItemId !== null && <ShowItem itemId={selectedItemId} />} */}
    </section>
  );
};

export default Item;
