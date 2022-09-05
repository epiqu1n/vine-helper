import React, { useState } from 'react';
import { ItemList, ItemMap } from '../../../types/Items';
import { ContentMessageType as CMT } from '../../../types/Messages';
import { registerMessageListener } from '../../controllers/contentMessageController';
import ItemTile from './ItemTile';
import styles from '../styles/ItemGrid.module.scss';

export default function ItemGrid() {
  const [newItems, setNewItems] = useState<ItemList>([]);
  const [catItems, setCatItems] = useState<ItemList>([]);
  const [isLoading, setIsLoading] = useState(true);

  registerMessageListener(CMT.UPDATE_NEW_ITEMS, (newItems, allItems) => {
    setNewItems(Object.values(newItems));
    setCatItems(Object.values(allItems));
    setIsLoading(false);
  });

  const loadEl = <div>Loading...</div>;
  const newItemText = `(${newItems.length} item${newItems.length !== 1 && 's'})`;
  const newItemEls =  newItems.map((item) => <ItemTile key={`item_${item.sku}`} item={item} />);

  return (
    <section className={styles['vh-section']}>
      <h3>What&apos;s New {isLoading || newItemText}</h3>
      <ul className={styles['vh-item-list']}>
        {
          isLoading ? loadEl
          : newItems.length > 0 ? newItemEls
          : 'Nothing for now!'
        }
      </ul>
    </section>
  );
}