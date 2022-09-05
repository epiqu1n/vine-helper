import { useEffect, useState } from 'react';
import { ItemList } from '../../types/Items';
import ItemGrid from './ItemGrid/ItemGrid';
import { getCategoryUrl, getCategoryItems } from '../../modules/items';

export default function App() {
  const [newItems, setNewItems] = useState<ItemList>([]);
  const [allItems, setAllItems] = useState<ItemList>([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadEl = <div>Loading...</div>;
  
  // Get new and all items for the current category
  useEffect(() => {
    const catUrl = getCategoryUrl(document.URL);
    getCategoryItems(catUrl).then(({ allItems, newItems }) => {
      setNewItems(Object.values(newItems));
      setAllItems(Object.values(allItems));
      setIsLoading(false);
    });
  }, []);
  
  return (<>
    <ItemGrid title="What's New" items={newItems} />
    {/* <ItemGrid title="Search" items={allItems} searchable /> */}
  </>);
}