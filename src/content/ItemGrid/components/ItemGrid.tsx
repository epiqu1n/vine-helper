import React, { useState } from 'react';
import { ItemSet } from '../../../types/Items';
import { ContentMessageType as CMT } from '../../../types/Messages';
import { registerMessageListener } from '../../controllers/contentMessageController';
import ItemTile from '../components/ItemTile';
import styles from '../styles/ItemGrid.module.scss';

export default function ItemGrid() {
  const [newItems, setNewItems] = useState<ItemSet>({});
  const [isLoading, setIsLoading] = useState(true);
  registerMessageListener(CMT.UPDATE_NEW_ITEMS, (items) => {
    setNewItems(items);
    setIsLoading(false);
  });

  // DEBUG -> no slice
  const newItemEls = Object.entries(newItems).slice(0, 10).map(([ sku, item ]) => (
    <ItemTile
      key={`item_${sku}`}
      sku={sku}
      item={item}
    />
  ));

  const loadEl = <div>Loading...</div>;
  const newItemText = `(${newItemEls.length} items)`;

  return (
    <section className={styles['vh-section']}>
      <h3>What&apos;s New {isLoading || newItemText}</h3>
      <ul className={styles['vh-item-list']}>{isLoading ? loadEl : newItemEls}</ul>
    </section>
  );
}