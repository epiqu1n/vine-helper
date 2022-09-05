import { useEffect, useState } from 'react';
import { Item } from '../../types/Items';
import ItemGrid from './ItemGrid/ItemGrid';
import { getCategoryUrl, getCategoryItems } from '../../modules/items';
import Warning from './shared/Warning';

const PAGE_LIMIT = 15;

export default function App() {
  const [newItems, setNewItems] = useState<Item[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overPageLimit, setOverPageLimit] = useState(false);
  
  // Get new and all items for the current category
  useEffect(() => {
    const catUrl = getCategoryUrl(document.URL);
    getCategoryItems(catUrl, PAGE_LIMIT).then(({ allItems, newItems, overPageLimit }) => {
      setNewItems(Object.values(newItems));
      setAllItems(Object.values(allItems));
      setOverPageLimit(overPageLimit);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (<>
      <h2>Vine Helper</h2>
      <h3>Loading...</h3>
    </>);
  }
  else {
    return (<>
      <h2>Vine Helper</h2>
      { overPageLimit && <Warning>Too many items in this category - limited queries to first and last {Math.floor(PAGE_LIMIT / 2)} pages</Warning> }
      <br />
      <ItemGrid title="What's New" items={newItems} />
      <ItemGrid title="Search this category" items={allItems} searchable filterBy={(item) => item.title} />
    </>);
  }
}