import { Item } from '../../../types/Items';
import ItemTile from './ItemTile';
import styles from './ItemGrid.module.scss';
import { pluralize } from '../../../modules/utils';
import SearchField from '../SearchField/SearchField';
import { useState } from 'react';

interface ItemGridProps {
  items: Item[],
  title: string,
  searchable?: boolean,
  filterBy?: (item: Item) => string
}

export default function ItemGrid({ items: allItems, title, searchable = false, filterBy }: ItemGridProps) {
  const [shownItems, setShownItems] = useState<Item[]>(searchable ? [] : allItems);
  const [searchQuery, setSearchQuery] = useState('');
  
  const itemEls =  shownItems.map((item) => <ItemTile key={`item_${item.sku}`} item={item} />);
  const numItemsText = shownItems.length > 0 && `(${shownItems.length} ${pluralize('item', shownItems.length)})`;

  return (
    <section className={styles['item-grid-section']}>
      <h3>{title} {shownItems.length > 0 && numItemsText}</h3>
      { searchable &&
        <SearchField
          items={allItems}
          onFilterChange={setShownItems}
          onInputChange={setSearchQuery}
          placeholder='Search this category...'
          filterBy={filterBy}
        />
      }
      <ul className={styles['item-grid-list']}>
        { shownItems.length > 0 ? itemEls : (searchable && !!searchQuery) || !searchable ? 'Nothing here!' : '' }
      </ul>
    </section>
  );
}