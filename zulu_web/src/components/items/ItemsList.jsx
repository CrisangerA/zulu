import { useEffect, useState } from "react";
import ItemCard from './ItemCard';
import ItemPagination from './ItemPagination';

export default function ItemsList({items}) {
  const itemsPerPage = 4;
  const [itemsPaginated, setItemsPaginated] = useState([]);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const range = activePage * itemsPerPage
    const newi = items.slice(range, range + itemsPerPage);
    setItemsPaginated(newi);
  }, [activePage, items]);

  const handleChangePage = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  }

  if (items.length === 0) return <p>Not found records</p>;

  return (
    <>
      {
        itemsPaginated.map((item, index) =>
          <ItemCard
            key={'product-' + item.id}
            item={item}
            length={items.length}
            index={index}
          />
        )
      }
      <ItemPagination 
        activePage={activePage}
        pages={Math.ceil(items.length / 4)}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
